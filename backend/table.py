from flask import Flask, jsonify
import sqlite3

app= Flask(__name__)


conn=sqlite3.connect("backend/database.db")

