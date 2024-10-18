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

conn.close()
