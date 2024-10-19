import os
from dotenv import load_dotenv
load_dotenv()

username = os.getenv('username')
password = os.getenv('password')
database = os.getenv('database')
host = os.getenv('ip_addr')

class Config:
    MYSQL_USER = username
    MYSQL_PASSWORD = password
    MYSQL_DB = database
    MYSQL_HOST = host