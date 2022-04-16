from flask import Flask, render_template, request, redirect, session, flash
from pymongo import MongoClient
import json

app = Flask(__name__)
with open('secretkey.txt') as key_file:
    secretkey = key_file.read()
app.secret_key = secretkey
client = MongoClient()
db = client.scouting_data

scoutingdata = {
    'auton':['Mobility', 'High Shot', 'High Scored', 'Low Shot', 'Low Scored'],
    'teleop': ['High Shot', 'High Scored', 'Low Shot', 'Low Scored', 'Defense on', 'Defense by'],
    'endgame': ['Climb Start Time', 'Climb Level', 'Climb End Time']
}
gamephases = ['auton', 'teleop', 'endgame']

@app.route('/')
def main():
    if 'user' in session:
        login = True
        username = session['user']
    else:
        login = False
        username = 'jBlay'
    return render_template('landing.html', login=login, username=username)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user' in session:
        if 'gamephase' in session:
            return render_template('continue.html', gamephase=session['gamephase'], username=session['username'])
        else:
            return redirect('/scout/selection')
    if request.method == 'GET':
        return render_template('login.html')
    if request.form['username'] == '':
        flash('Please type your name!','danger')
        return redirect('/login')
    session.clear()
    session['user'] = request.form['username']
    return redirect('/')

@app.route('/logout')
def logout():
    session.clear()
    flash('Successfully logged out!','success')
    return redirect('/')


@app.route('/scout/<gamephase>')
def scout(gamephase):
    if 'user' not in session:
        flash('Invalid Session','danger')
        return redirect('/')
    if gamephase not in gamephases + ['selection', 'comments']:
        return redirect('/login')
    session['gamephase'] = gamephase
    if gamephase in ['selection','comments']:
        return render_template('scout-'+gamephase+'.html', username=session['username'])
    infodict = {}
    for point in scoutingdata[gamephase]:
        infodict[point] = session[point] if point in session else ''
    return render_template('scout-'+gamephase+'.html', info = infodict)

@app.route('/select', methods=['POST'])
def select():
    if 'user' not in session:
        flash('Invalid Session','danger')
        return redirect('/')
    session['team'] = request.form['team']
    session['type'] = request.form['type']
    session['match'] = request.form['match']
    return redirect('/scout/auton')

@app.route('/submit', methods=['POST'])
def submit():
    if session['gamephase'] == 'comments':
        flash('Your data has been recorded!','success')
        return redirect('/')

@app.route('/view')
def view():
    return render_template('viewdata.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')