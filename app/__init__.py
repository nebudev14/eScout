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
event = ''

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

def compute():
    teamData = db.teams
    teamData.drop()
    data = db.comp
    teams = data.distinct('team')
    climbPoints = {
        'None': 0,
        'Low': 4,
        'Mid': 6,
        'High': 10,
        'Traverse': 15
    }
    dataDict = dict()
    for team in teams:
        matches = data.find({'team':team})
        i = j = climb = mobility = time = 0
        ah = al = th = tl = [0, 0]
        for match in matches:
            if match['mobility'] == 'Y':
                mobility += 1
            ah = [ah[0] + int(match['ahs']), ah[1] + int(match['ah'])]
            al = [al[0] + int(match['als']), al[1] + int(match['al'])]
            th = [th[0] + int(match['ths']), th[1] + int(match['th'])]
            tl = [tl[0] + int(match['tls']), tl[1] + int(match['tl'])]
            climb += climbPoints[match['climb']]
            if match['climb'] != 'None':
                time += int(match['time'])
                j += 1
            i += 1
        dataDict[team] = {
            'team': team,
            'mobility': mobility / i,
            'ah': ah[1] / i,
            'ahs': ah[0] / i,
            'al': al[1] / i,
            'als': al[0] / i,
            'th': th[1] / i,
            'ths': th[0] / i,
            'tl': tl[1] / i,
            'tls': tl[0] / i,
            'clm': climb / i,
            'time' : 0 if j == 0 else time / j
        }
    for team in teams:
        matches = data.find({'team':team})
        i = defense = 0
        for match in matches:
            if match['do'] in teams:
                temp = data.find_one({'team':match['do'], 'match':match['match']})
                if temp != None > 0:
                    defense += 2 * (dataDict[match['do']]['ths'] - int(temp['ths'])) + (dataDict[match['do']]['tls'] - int(temp['tls'])) + (dataDict[match['do']]['clm'] - climbPoints[temp['climb']])
                    i += 1
        if i == 0:
            dataDict[team]['def'] = -1
        else:
            dataDict[team]['def'] = defense / i
        dataDict[team]['acc'] = -1 if (dataDict[team]['ah'] + dataDict[team]['al'] + dataDict[team]['th'] + dataDict[team]['tl']) == 0 else (dataDict[team]['ahs'] + dataDict[team]['als'] + dataDict[team]['ths'] + dataDict[team]['tls']) / (dataDict[team]['ah'] + dataDict[team]['al'] + dataDict[team]['th'] + dataDict[team]['tl'])
        dataDict[team]['bal'] = dataDict[team]['ahs'] + dataDict[team]['als'] + dataDict[team]['ths'] + dataDict[team]['tls']
        dataDict[team]['pts'] = dataDict[team]['ahs'] * 4 + dataDict[team]['als'] * 2 + dataDict[team]['ths'] * 2 + dataDict[team]['tls'] + dataDict[team]['clm']
        teamData.insert_one(dataDict[team])


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
    return render_template('selection.html', event=event)

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
    if request.form['event'] != event:
        match = request.form['event'] + ' '
    else:
        match = ''
    session['type'] = match + request.form['type']
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

@app.route('/viewall', methods=['POST', 'GET'])
def viewall():
    compute()
    if request.method == 'GET':
        return render_template('viewall.html', teams=db.teams.find().sort({'pts':-1}))
    return render_template('viewall.html', teams=db.teams.find().sort(request.form['sort'],-1))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)