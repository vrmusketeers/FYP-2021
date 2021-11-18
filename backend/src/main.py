# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_flex_quickstart]
from flask import Flask, send_from_directory
from flask import request
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS #comment this on deployment
import datetime
import json
from datetime import datetime
import os


app = Flask(__name__)
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:Admin123@34.83.19.87:3306/musketeerdb'
##app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Cisco123@localhost:3306/pyflask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db=SQLAlchemy(app)
ma=Marshmallow(app)

# clear db metadata object
db.metadata.clear()

class User(db.Model):
    userID = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(45))
    userType = db.Column(db.String(45))
    password = db.Column(db.String(45))
    firstName = db.Column(db.String(45))
    lastName = db.Column(db.String(45))
    email = db.Column(db.String(100))
    age = db.Column(db.Integer)
    city = db.Column(db.String(45))
    state = db.Column(db.String(45))
    country = db.Column(db.String(45))
    phone = db.Column(db.String(45))
    dateOfBirth = db.Column(db.DateTime)

    def __init__(self, userName,userType,password,firstName,lastName,email,city,state,phone,dateOfBirth):
        self.userName = userName
        self.userType=userType
        self.password=password
        self.dateOfBirth=dateOfBirth
        self.firstName=firstName
        self.lastName=lastName
        self.email=email
        self.city=city
        self.state=state
        self.phone=phone

class Tests(db.Model):
    testID = db.Column(db.Integer, primary_key=True)
    testName = db.Column(db.String(45))
    testType = db.Column(db.String(45))
    testResults=db.Column(db.String(100))
    description = db.Column(db.String(45))
    patientID = db.Column(db.Integer)
    fileID = db.Column(db.Integer)
    imageID = db.Column(db.Integer)
    testDate = db.Column(db.DateTime, default=datetime.now)

    def __init__(self, testName,testType,testResults,description,patientID,fileID,imageID,testDate):
        self.testName = testName
        self.testType=testType
        self.testResults=testResults
        self.description=description
        self.patientID=patientID
        self.imageID=imageID
        self.fileID=fileID
        self.testDate=testDate

class TestImages(db.Model):
    imageID = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.BLOB)
    description = db.Column(db.String(100))

    def __init__(self, image, description):
        self.image = image
        self.description=description

class UserSchema(ma.Schema):
    class Meta:
        fields=('userID','userName','userType','password','firstName','lastName','email','city','state','phone','dateOfBirth')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class TestSchema(ma.Schema):
    class Meta:
        fields=('testID','testName','testType','testResults','description','patientID')

test_schema = TestSchema()
tests_schema = TestSchema(many=True)


class PatientsTestSchema(ma.Schema):
    class Meta:
        fields=('testID','patientID','fileID','imageID','description','testName','testDate')

patientTest_schema = PatientsTestSchema()
patientTests_schema = PatientsTestSchema(many=True)

class ImageSchema(ma.Schema):
    class Meta:
        fields=('imageID','image','description')

image_schema = ImageSchema()

@app.route('/addUser', methods=['POST'])
def add_user():
    userName=request.json['userName']
    userType=request.json['userType']
    password=request.json['password']
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    email=request.json['email']
    city=request.json['city']
    state=request.json['state']
    phone=request.json['phone']
    date_string=request.json['dateOfBirth']
    dateOfBirth= datetime.strptime(date_string, "%m/%d/%Y")

    users = User(userName,userType,password,firstName,lastName,email,city,state,phone,dateOfBirth)
    db.session.add(users)
    db.session.commit()
    
    return user_schema.jsonify(users)

@app.route('/getUsers', methods=['GET'])
def get_users():
    all_users = User.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)


@app.route('/getUser/<id>', methods=['GET'])
def post_details(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)

@app.route('/updateUser/<id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)

    userName=request.json['userName']
    userType=request.json['userType']
    password=request.json['password']
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    email=request.json['email']
    city=request.json['city']
    state=request.json['state']
    phone=request.json['phone']
    date_string=request.json['dateOfBirth']
    dateOfBirth= datetime.strptime(date_string, "%m/%d/%Y")

    user.userName = userName
    user.userType = userType
    user.password =password
    user.firstName =firstName
    user.lastName =lastName
    user.email =email
    user.city =city
    user.state =state
    user.phone =phone
    user.dateOfBirth =dateOfBirth

    db.session.commit()

    return user_schema.jsonify(user)

@app.route('/deleteUser/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)

@app.route('/login', methods=['POST'])
def login():
    reqUserName=request.json['userName']
    reqPassword=request.json['password']

    user = User.query.filter(User.userName==reqUserName).first()

    if user:
        if(user.userName == reqUserName):
            if(user.password == reqPassword):
                return '<h1> Valid Login </h1>'                 
            else:
                return '<h1>Invalid Login</h1>'


@app.route('/getPatients', methods=['GET'])
def get_patients():

    all_patients = User.query.filter(User.userType=='Patient').all()
    results = users_schema.dump(all_patients)
    return jsonify(results)

@app.route('/getDoctors', methods=['GET'])
def get_doctors():

    alldoctors = User.query.filter(User.userType=='Doctor').all()
    results = users_schema.dump(alldoctors)
    return jsonify(results)

@app.route('/createTest', methods=['POST'])
def create_test():
    testName=request.json['testName']
    testType=request.json['testType']
    testResults=request.json['testResults']
    description=request.json['description']
    patientID=request.json['patientID']

    tests = Tests(testName,testType,testResults,description,patientID)
    db.session.add(tests)
    db.session.commit()

    print(test_schema.get_attribute(id))
    
    return test_schema.jsonify(tests)

@app.route('/getPatientTests', methods=['POST'])
def getPatientsTests():
    reqPatientID=request.json['patientId']

    tests = Tests.query.filter(Tests.patientID==reqPatientID).all()
    results = tests_schema.dump(tests)
    return jsonify(results)

@app.route('/getPatientTestDetails', methods=['GET'])
def getPatientTestDetails():
    #reqPatientID=request.json['patientId']
    reqPatientID=request.args.get('patientId')
    cursor = db.session.execute("""
        select patients.patientID,  concat(user.firstName,' ',user.lastName) patientName, patients.processed, DATE_FORMAT(patients.lastVisitDate, '%Y-%m-%d') lastVisitDate, tests.fileID MRNNo,pv.*
        from user,patients, tests, phenotypic_values pv
        where user.userID = patients.userID and patients.patientID=tests.patientID and tests.fileID=pv.file_id
        and user.userType='Patient' and patients.patientID=:param;
    """,{"param":reqPatientID})
    data = []
    rows = cursor.fetchall()

    data.append([{**row} for row in rows])

    #results = [dict(patientId=row[0],patientName=row[1], age=row[2],email=row[3],phone=row[4],state=row[5],city=row[6],country=row[7],processed=row[8],lastVisitDate=row[9])
    #          for row in cursor.fetchall()]
    #rows = cursor.fetchall()
    #for row in rows:
    #    data.append(dict(zip(columns, row)))

    return json.dumps(data)


def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData

@app.route('/uploadImage', methods=['POST'])
def uploadImage():
    imagefile=request.json['imagefile']
    description=request.json['description']
    testID = request.json['testID']

    ##file = convertToBinaryData(imagefile)
    with open(imagefile, encoding="ISO-8859-1", errors='ignore') as f:
        contents = f.read()

    contents=json.dumps(imagefile).encode('utf-8')

    image = TestImages(contents,description)
    db.session.add(image)
    db.session.commit()

    #imageID = image.imageID
    #print (imageID)
    #cursor = db.session.execute("""
    #    update tests set imageID = :imageID where testID = :testID ;
    #""",(imageID,testID))

    #db.session.commit()
    
    return image_schema.jsonify(image)

""" @app.route('/getPatientsProfile', methods=['POST'])
def getPatientsProfile():
    reqPatientID=request.json['patientId']
    user = User.query.get(reqPatientID)

    return user_schema.jsonify(user) """

@app.route('/getPatientsProfile', methods=['GET'])
def getPatientsProfile():
    #reqPatientID=request.json['patientId']
    patientId=request.args.get('patientId')
    cursor = db.session.execute("""
        select patients.patientID,  concat(user.firstName,' ',user.lastName) patientName, DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(dateOfBirth, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(dateOfBirth, '00-%m-%d')) age, email, phone, state, city, country,patients.processed, DATE_FORMAT(patients.lastVisitDate, '%Y-%m-%d') lastVisitDate
        from user,patients where user.userID = patients.userID and user.userType='Patient' and patients.patientID=:param;
    """,{"param":patientId})
    results = [dict(patientId=row[0],patientName=row[1], age=row[2],email=row[3],phone=row[4],state=row[5],city=row[6],country=row[7],processed=row[8],lastVisitDate=row[9])
               for row in cursor.fetchall()]

    return jsonify(results)


@app.route('/getAllPatientTestDetails', methods=['GET'])
def getAllPatientTestDetails():

    cursor = db.session.execute("""
        select user.userId,  concat(user.firstName,' ',user.lastName) patientName, DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(dateOfBirth, '%Y') - (DATE_FORMAT(NOW(), '00-%m-%d') < DATE_FORMAT(dateOfBirth, '00-%m-%d')) age, tests.testID, tests.fileID, tests.testDate from user, tests where user.userId = tests.patientID and user.userType='Patient';
    """)
    results = [dict(userId=row[0],patientName=row[1], age=row[2],testID=row[3],MRNNo=row[4],testDate=row[5])
               for row in cursor.fetchall()]

    return jsonify(results)

@app.route("/", defaults={'path':''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_flex_quickstart]