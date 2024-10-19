from flask import Flask, jsonify
import sqlite3



conn=sqlite3.connect("backend/database.db")


conn.execute('''
      DROP TABLE Forums;
''')


print("table created successfully")
conn.close()



