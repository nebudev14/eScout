from flask import Flask, render_template, request, redirect, session, flash
from pymongo import MongoClient

app = Flask(__name__)
with open('secretkey.txt') as key_file:
    secretkey = key_file.read()
app.secret_key = secretkey

with open('database.txt') as db_file:
    db_link = db_file.read()
client = MongoClient(db_link)
db = client.scouting


#scoutingdata = {
#    'selection': [],
#    'auton': ['Mobility', 'High Shot A', 'High Scored A', 'Low Shot A', 'Low Scored A'],
#    'teleop': ['High Shot', 'High Scored', 'Low Shot', 'Low Scored', 'Defense on', 'Defense by'],
#    'endgame': ['Climb Start', 'Climb Level', 'Climb End'],
#    'comments': ['comments']
#}

def enterData(s):
    try:
        int(s['Climb Start'])
        int(s['Climb End'])
    except ValueError:
        s['Climb Start'] = s['Climb End'] = '0'
    obj = {
        'match': s['type'] + s['match'],
        'team': s['team'],
        'person': s['user'],
        'mobility': s['Mobility'],
        'ah': s['High Shot A'],
        'ahs': s['High Scored A'],
        'al': s['Low Shot A'],
        'als': s['Low Scored A'],
        'th': s['High Shot'],
        'ths': s['High Scored'],
        'tl': s['Low Shot'],
        'tls': s['Low Scored'],
        'do': s['Defense on'],
        'db': s['Defense by'],
        'climb': s['Climb Level'],
        'time': abs(int(s['Climb Start']) - int(s['Climb End'])),
        'comment': s['comments']
    }
    db.comp.insert_one(obj)

#gamephases = ['auton', 'teleop', 'endgame']

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
        return redirect('/selection')
    if request.method == 'GET':
        return render_template('login.html')
    if request.form['username'] == '':
        flash('Please type your name!','danger')
        return redirect('/login')
    session.clear()
    session['user'] = request.form['username']
    return redirect('/selection')

@app.route('/clear')
def clear():
    user = session['user']
    session.clear()
    session['user'] = user
    return redirect('/selection')

@app.route('/logout')
def logout():
    session.clear()
    flash('Successfully logged out!','success')
    return redirect('/')

#@app.route('/scout/<gamephase>')
#def scout(gamephase):
#    if 'user' not in session:
#        flash('Invalid Session','danger')
#        return redirect('/')
#    if gamephase not in gamephases + ['selection', 'comments']:
#        return redirect('/login')
#    session['gamephase'] = gamephase
#    info = {}
#    for point in scoutingdata[gamephase] + ['type', 'match', 'team']:
#        info[point] = session[point] if point in session.keys() else ''
#    return render_template('scout-'+gamephase+'.html', info=info)

@app.route('/selection')
def selection():
    if 'user' not in session:
        flash('Invalid Session','danger')
        return redirect('/')
    return render_template('selection.html')

@app.route('/scout')
def scout():
    if 'user' not in session:
        flash('Invalid Session','danger')
        return redirect('/')
    info = dict()
    for key in ['team', 'type', 'match']:
        info[key] = session[key]
    return render_template('scout.html', info=info)

@app.route('/select', methods=['POST'])
def select():
    if 'user' not in session:
        flash('Invalid Session','danger')
        return redirect('/')
    session['team'] = request.form['team']
    session['type'] = request.form['type']
    session['match'] = request.form['match']
#    return redirect('/scout/auton')
    return redirect('/scout')

@app.route('/submit', methods=['POST'])
def submit():
#    if session['gamephase'] == 'auton':
#        session['Mobility'] = ''
#    for key in request.form:
#        session[key] = request.form[key]
#    if request.form['next'] == 'submit':
#        enterData(session)
#        user = session['user']
#        session.clear()
#        session['user'] = user
#        flash('Your data has been recorded!','success')
#        return redirect('/')
#    return redirect('/scout/'+request.form['next'])
    print(request.form)
    data = {}
    data['user'] = session['user']
    data['team'] = session['team']
    data['type'] = session['type']
    data['match'] = session['match']
    for key in request.form:
        data[key] = request.form[key]
    enterData(data)
    flash('Your data has been recorded!','success')
    return redirect('/')

@app.route('/view', methods=['POST', 'GET'])
def view():
    if request.method == 'GET':
        return render_template('select.html')
    matches = db.comp.find({'team': request.form['team']})
    comments = db.comp.find({'team': request.form['team']})
    return render_template('viewdata.html', team=request.form['team'], matches=matches, comments=comments)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)