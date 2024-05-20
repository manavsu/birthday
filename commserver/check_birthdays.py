from slack import Slack
import requests
import json
import random
import schedule
import time
from logging import *

def check_birthdays():
    info("Checking birthdays...")
    birthdays_today = json.loads(requests.get("http://localhost:50055/birthdays/today").content)

    if len(birthdays_today) == 0:
        info("No birthdays today.")
        return

    template_messages = open("birthday_messages.txt", "r").readlines()
    slackAPI = Slack()

    for birthday in birthdays_today:
        message = random.choice(template_messages).replace("[NAME]", birthday)
        slackAPI.send_message(message)

if __name__ == "__main__":
    basicConfig(level=INFO)
    schedule.every().day.at("09:00").do(check_birthdays)
    info("Configured birthday check to run at 9:00 AM every day.")
    while True:
        schedule.run_pending()
        time.sleep(100)



