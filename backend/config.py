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
<<<<<<< HEAD
    MYSQL_HOST = host
=======
    MYSQL_HOST = host
>>>>>>> 2846705d93e8b01ef240bcd81db9cdd8422144fd
