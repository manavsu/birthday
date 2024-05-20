from flask import Flask, request, jsonify
from BirthdayRegistry import BirthdayRegistry
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

data = BirthdayRegistry()

@app.route("/birthdays", methods=["GET"])
def get_items():
    return data.to_json()

@app.route("/birthdays/<name>/<month>/<day>", methods=["POST"])
def add_item(name, month, day):
    data.add_birthday(name, month, day)
    return "OK"

@app.route("/birthdays/today", methods=["GET"])
def get_items_today():
    return jsonify(data.get_birthdays_today())

@app.route("/birthdays/<name>", methods=["DELETE"])
def delete_item(name):
    data.delete_birthday(name)
    return "OK"

if __name__ == '__main__':
    app.run(port=50055, debug=True)