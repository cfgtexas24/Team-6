from flask import Flask, jsonify,request 
from table import conn
import sqlite3 

app= Flask(__name__)

def get_conn_database():
    conn=sqlite3.connect('database.db')
    conn.row_factory=sqlite3.Row #fetch data as rows
    return conn

#route to get all users 
@app.route('/users',methods=['GET'])
def get_users():
    conn=get_conn_database()
    users=conn.execute('SELECT * FROM Users').fetchall()
    conn.close()

    #convert data fetch into dictionary and send json reponse 

    user_list=[dict(user) for user in users]
    return jsonify(user_list)


#route to add new user
@app.route('/users', methods=['POST'])
def add_user():
    data=request.get_json()
    user_name=data['user_name']
    password=data['password']
    email=data['email']

    if not user_name or not password or not email:
        return(jsonify({'message':'you must include a username, password and an email'}),400)

    conn=get_conn_database()
    conn.execute('INSERT INTO Users(first_name, last_name, email) VALUE(?,?,?)',(user_name,password,email))
    conn.commit()
    conn.close()

    return jsonify({'message':'User added sucessfully!'}),201