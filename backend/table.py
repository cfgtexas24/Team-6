from flask import Flask, jsonify
import mysql.connector
from config import Config
app= Flask(name)

app.config.from_object(Config)


conn = mysql.connector.connect(
            username=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            host=app.config['MYSQL_HOST'],
            database=app.config['MYSQL_DB']
        ) 

cursor = conn.cursor()


print("database open successfully!!")
cursor.execute('''
      CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      user_name TEXT NOT NULL,
                                      password TEXT NOT NULL,
                                      role TEXT NOT NULL,
                                      email TEXT NOT NULL UNIQUE)''')


print("table created successfully")

cursor.execute('''CREATE TABLE IF NOT EXIST Employer(id INTEGER PRIMARY KEY AUTOINCREMENT,
               email TEXT NOT NULL UNIQUE) ''' )


cursor.execute('''
    CREATE TABLE IF NOT EXISTS Post(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        username TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
''')
print("table post created successfully")

cursor.execute('''
    CREATE TABLE IF NOT EXISTS comments(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        post_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        FOREIGN KEY(post_id) REFERENCES Post(id),
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
''')
print("table comments created successfully")





print("table created successfully")
cusor.close()



