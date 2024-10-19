from flask import Flask, jsonify,request
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from dotenv import load_dotenv
from flask_cors import CORS
import mysql.connector
from config import Config
import os
load_dotenv()


secret = os.getenv("secret")

app= Flask(__name__)
CORS(app)


app.config["JWT_SECRET_KEY"] = secret# Change this!
jwt = JWTManager(app)

def get_conn_database():
    app.config.from_object(Config)

    try:
        conn = mysql.connector.connect(
            username=app.config['MYSQL_USER'],       # Changed from username to user
            password=app.config['MYSQL_PASSWORD'],
            host=app.config['MYSQL_HOST'],
            database=app.config['MYSQL_DB']
        )

        if conn.is_connected():
            print("Connected to MySQL database")
            cursor = conn.cursor()
            return conn, cursor  # Return both connection and cursor
    except Error as e:
        print(f"Error: {e}")
        return None, None  # Return None if there was an error

#when logged in you will get jwt token
@app.route('/login', methods=['POST'])
def login():
    user_name = request.json.get("user_name", None)
    password = request.json.get("password", None)

    if not username or not password :
        access_token = create_access_token(identity={username})
        return jsonify(access_token=access_token)


#route to add new user
@app.route('/register', methods=['POST'])
def add_user():
    data=request.get_json()
    username=data['username']
    password=data['password']
    email=data['email']
    role=data['role']
    conn, cursor = get_conn_database()
    if not username or not password or not email:
        return(jsonify({'message':'you must include a username, password and an email'}),400)

    sql = ('INSERT INTO Users (username, password, email, role) VALUES (%s, %s, %s, %s)')
    cursor.execute(sql, (username, password, email, role))
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


#route to add new employer user
@app.route('/comments', methods=['POST'])
def add_employer():
    data=request.get_json()
    email=data('email')



    if not email :
        return(jsonify({'message':'Need to provide the following email information'}),400)
    conn,cursor=get_conn_database()

    if not conn:
        return jsonify({'message': 'Database connection failed'}), 500



    try: 
        insert_query='INSERT INTO comments (email) VALUES (%s)'
        cursor.execute(insert_query,(email))
        conn.commit()

        return jsonify({'message':'post added sucessfully!'}),201

    except Exception as e:
        conn.rollback()  # Rollback in case of any error
        return jsonify({'message': 'Failed to add post', 'error': str(e)}), 500

    finally:
        cursor.close()  # Close the cursor
        conn.close()  # Close the connection




#route to add new post
@app.route('/comments', methods=['POST'])
def add_post():
    data=request.get_json()
    title=data('title')
    content=data('content')
    username=data('username')



    if not title or not post_id or not username :
        return(jsonify({'message':'Need to provide the following information'}),400)
    conn,cursor=get_conn_database()

    if not conn:
        return jsonify({'message': 'Database connection failed'}), 500



    try: 
        insert_query='INSERT INTO comments (title,content,username) VALUES (%s,%s,%s)'
        cursor.execute(insert_query,(title,content,username))
        conn.commit()

        return jsonify({'message':'post added sucessfully!'}),201

    except Exception as e:
        conn.rollback()  # Rollback in case of any error
        return jsonify({'message': 'Failed to add post', 'error': str(e)}), 500

    finally:
        cursor.close()  # Close the cursor
        conn.close()  # Close the connection

#route to add new comment
@app.route('/comments', methods=['POST'])
def add_comment():
    data=request.get_json()
    title=data('title')
    post_id=data('post_id')
    username=data('username')



    if not title or not post_id or not username :
        return(jsonify({'message':'Need to provide the following information'}),400)
    conn,cursor=get_conn_database()

    if not conn:
        return jsonify({'message': 'Database connection failed'}), 500



    try: 
        insert_query='INSERT INTO comments (title,post_id,username) VALUES (%s,%s,%s)'
        cursor.execute(insert_query,(title,post_id,username))
        conn.commit()

        return jsonify({'message':'comment added sucessfully!'}),201

    except Exception as e:
        conn.rollback()  # Rollback in case of any error
        return jsonify({'message': 'Failed to add comment', 'error': str(e)}), 500

    finally:
        cursor.close()  # Close the cursor
        conn.close()  # Close the connection





if __name__ == '__main__':
    app.run(debug=True, port=8000)