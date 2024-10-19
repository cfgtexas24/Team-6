from flask import Flask, jsonify
import sqlite3

app= Flask(__name__)

from flask import Flask, jsonify 
import sqlite3 

app= Flask(__name__)


conn=sqlite3.connect("database.db")
print("database open successfully!!")
conn.execute('''
      CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                      user_name TEXT NOT NULL,
                                      password TEXT NOT NULL,
                                      email TEXT NOT NULL UNIQUE)''')


print("table created successfully")


conn.execute('''
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

conn.execute('''
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



conn=sqlite3.connect("backend/database.db")

