from flask import Flask, render_template, request, redirect, session
from pymongo import MongoClient
import json

app = Flask(__name__)
with open('secretkey.txt') as key_file:
    secretkey = key_file.read()
app.secret_key = secretkey
client = MongoClient()
db = client.scouting_data

@app.route('/')
def main():
    return render_template('landing.html')

@app.route('/scout/<gamephase>')
def scout():
    return render_template('scout.html', phase=gamephase)

@app.route('/submit', methods=['POST'])
def submit():
    return redirect('/scout')

@app.route('/view')
def view():
    return render_template('viewdata.html')

if __name__ = '__main__':
    app.debug = True
    app.run(host='0.0.0.0')