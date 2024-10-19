from flask import Flask, jsonify,request
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from dotenv import load_dotenv
from flask_cors import CORS
import os
import sqlite3
load_dotenv()




secret = os.getenv("secret")
load_dotenv()

app= Flask(__name__)
app.config.from_prefixed_env()
CORS(app)


app.config["JWT_SECRET_KEY"] = secret# Change this!
jwt = JWTManager(app)


def get_conn_database():
    conn=sqlite3.connect('backend/database.db')
    conn.row_factory=sqlite3.Row #fetch data as rows
    return conn

#when logged in you will get jwt token
@app.route('/login', methods=['POST'])
def login():
    user_name = request.json.get("user_name", None)
    password = request.json.get("password", None)
    if not user_name or not password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user_name)
    return jsonify(access_token=access_token)


#route to add new user
@app.route('/register', methods=['POST'])
def add_user():
    data=request.get_json()
    user_name=data['user_name']
    password=data['password']
    email=data['email']

    if not user_name or not password or not email:
        return(jsonify({'message':'you must include a username, password and an email'}),400)

    with get_conn_database() as conn:
        conn.execute('INSERT INTO Users (user_name, password, email) VALUES (?, ?, ?)', (user_name, password, email))
        conn.commit()

        return jsonify({'message':'User added sucessfully!'}),201


#route to get all Employers
@app.route('/Employers',methods=['GET'])
def get_employers():
    #renamed function to get employer
    conn=get_conn_database()
    Employers=conn.execute('SELECT * FROM Employers').fetchall()
    conn.close()

    #convert data fetch into dictionary and send json reponse

    user_list=[dict(Employers) for user in Employers]
    return jsonify(user_list)


#route to add new user
@app.route('/Employers', methods=['POST'])
def add_employer():
    data=request.get_json()
    email=data['email']

    if not email:
        return(jsonify({'message':'Need to provide email'}),400)

    conn=get_conn_database()
    conn.execute('INSERT INTO Employers (email) VALUES (?)', ( email))
    conn.commit()
    conn.close()

    return jsonify({'message':'User added sucessfully!'}),201



#route to add new post 
@app.route('/Post', methods=['POST'])
def add_post():
    data=request.get_json()
    title=data['title']
    content=data['content']
    user_name=data['username']
    created_at=data['created_at']


    if not title or not content or not user_name or not created_at:
        return(jsonify({'message':'Need to provide the following information'}),400)

    conn=get_conn_database()
    conn.execute('INSERT INTO Employers (email) VALUES (?,?,?,?)', ( title, content, user_name,created_at))
    conn.commit()
    conn.close()

    return jsonify({'message':'Post added sucessfully!'}),201


if __name__ == '__main__':
    app.run(debug=True)