from flask import Flask, redirect, url_for, session
from pymongo import MongoClient

app = Flask(__name__)
with open('secretkey.txt') as key_file:
    secretkey = key_file.read()
app.secret_key = secretkey

with open('database.txt') as db_file:
    db_link = db_file.read()
client = MongoClient(db_link)
db = client.scouting

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)