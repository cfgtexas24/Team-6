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



#
def get_conn_database():
    app.config.from_object(Config)

    try:
        conn = mysql.connector.connect(
            username=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            host=app.config['MYSQL_HOST'],
            database=app.config['MYSQL_DB']
        )

        if conn.is_connected():
            print("Connected to MySQL database")
            cursor = conn.cursor()
            return conn, cursor  # Return both connection and cursor
    except:
        print("Error")
        return None, None  # Return None if there was an error

def get_user_role(username, password):
    conn, cursor = get_conn_database()
    if conn is None or cursor is None:
        return None

    try:
        sql = ("SELECT role FROM Users WHERE username = %s AND password = %s")
        cursor.execute(sql, (username, password))
        result = cursor.fetchone()

        if result:
            return result[0], None
        else:
            return None, "Invalid Username or Password"

    except mysql.connector.error as e:
        return None, "Error Fetching data"
    finally:
        cursor.close()
        conn.close()


#when logged in you will get jwt token
@app.route('/login', methods=['POST'])
def login():

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password :
        return jsonify({"message": "Error with username or password"}), 400

    role, error = get_user_role(username, password)  # Check user credentials
    if error:
        return jsonify({"error": "ERROR"}), 401
    access_token = create_access_token(identity={'role': role})
    return jsonify(access_token=access_token), 200


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

#route to add new employer user
@app.route('/employer', methods=['POST'])
def add_employer():
    data=request.get_json()
    email=data['email']



    if not email :
        return(jsonify({'message':'Need to provide the following email information'}),400)
    conn,cursor=get_conn_database()

    if not conn:
        return jsonify({'message': 'Database connection failed'}), 500



    try:
        insert_query='INSERT INTO comments (email) VALUES (%s)'
        cursor.execute(insert_query,(email,))
        conn.commit()

        return jsonify({'message':'post added sucessfully!'}),201

    except Exception as e:
        conn.rollback()  # Rollback in case of any error
        return jsonify({'message': 'Failed to add post', 'error': str(e)}), 500

    finally:
        cursor.close()  # Close the cursor
        conn.close()  # Close the connection




@app.route('/post', methods=['POST', 'GET'])
def add_post():
    
    conn, cursor = get_conn_database()

    if not conn:
        return jsonify({'message': 'Database connection failed'}), 500

    if request.method == 'POST':
        data = request.get_json()
        title = data.get['title']
        content = data.get['content']
        username = data.get['username']

        if not title or not content or not username:
            return jsonify({'message': 'Need to provide the following information'}), 400

        try:
            cursor.execute('SELECT id FROM Users WHERE username=%s',(username,))
            user=cursor.fetchone()
            if not user:
                return jsonify({'message':'user not not found'}),404
            
            user_id=user[0]
            # place into post table
            insert_query = 'INSERT INTO Post (title, content, username) VALUES (%s, %s, %s)'
            cursor.execute(insert_query, (title, content, user_id))
            conn.commit()

            return jsonify({'message': 'Post added successfully!'}), 201

        except Exception as e:
            conn.rollback()  
            return jsonify({'message': 'Failed to add post', 'error': str(e)}), 500

        finally:
            cursor.close()  
            conn.close()  

    elif request.method == 'GET':
        try:
            #get all the data 
            cursor.execute('SELECT * FROM Post')
            posts = cursor.fetchall()

            # place the info into dic
            all_posts = []
            for post in posts:
                all_posts.append({
                    'id': post[0],         
                    'title': post[1],      
                    'content': post[2],    
                    'username': post[3],   
                    'created_at': post[4] 
                })

            return jsonify(all_posts), 200

        except Exception as e:
            return jsonify({'message': 'Failed to fetch posts', 'error': str(e)}), 500

        finally:
            cursor.close()
            conn.close()


#route to add new comment
@app.route('/comments', methods=['POST'])
def add_comment():
    data=request.get_json()
    comment=data['comment']
    post_id=data['post_id']
    username=data['username']



    if not comment or not post_id or not username :
        return(jsonify({'message':'Need to provide the following information'}),400)
    conn,cursor=get_conn_database()

    if not conn:
        return jsonify({'message': 'Database connection failed'}), 500



    try:
        insert_query='INSERT INTO comments (comment,post_id,username) VALUES (%s,%s,%s)'
        cursor.execute(insert_query,(comment,post_id,username))
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