import json
import datetime
import threading
import os
import logging

class BirthdayRegistry:
    BirthdayLocation = 'data/birthday_data.json'
    Lock = threading.Lock()

    def __init__(self):
        if not os.path.exists(self.BirthdayLocation):
            logging.info("No birthday data found, creating new file")
            with self.Lock:
                self.birthdays = {}
            self.write_to_store()

        with self.Lock:
            with open(self.BirthdayLocation, "r") as birthday_file:
                birthdays = json.load(birthday_file)
                self.birthdays = {name: Birthday.from_json(birthdays[name]) for name in birthdays}

    def add_birthday(self, name, month, day):
        with self.Lock:
            self.birthdays[name] = Birthday(int(month), int(day))
        self.write_to_store()
    
    def delete_birthday(self, name):
        with self.Lock:
            del self.birthdays[name]
        self.write_to_store()

    def get_birthdays_today(self):
        with self.Lock:
            return [name for name in self.birthdays if self.birthdays[name] == datetime.date.today()]
    
    def get_all_birthdays(self):
        with self.Lock:
            return self.birthdays
    
    def write_to_store(self):
        with self.Lock:
            with open(self.BirthdayLocation, "w") as birthday_file:
                json.dump({name:self.birthdays[name].to_json() for name in self.birthdays}, birthday_file, indent=4)

    def to_json(self):
        with self.Lock:
            return json.dumps([{"name":name, "date":self.birthdays[name].to_json()} for name in self.birthdays], indent=4)

class Birthday:
    def from_json(json):
        return Birthday(int(json["month"]), int(json["day"]))
    
    def __init__(self, month:int, day:int):
        self.month = month
        self.day = day

    def __str__(self):
        return f"{self.month}/{self.day}"

    def to_json(self):
        return {"month": self.month, "day": self.day}

    def __eq__(self, __value: object) -> bool:
        if isinstance(__value, Birthday):
            return self.month == __value.month and self.day == __value.day
        if isinstance(__value, datetime.date):
            return self.month == __value.month and self.day == __value.day
        return False