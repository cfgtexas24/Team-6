from flask import Flask, jsonify
import mysql.connector
from config import Config
app= Flask(__name__)

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
      CREATE TABLE IF NOT EXISTS Users(id INT PRIMARY KEY AUTO_INCREMENT,
                                      username VARCHAR(20) NOT NULL,
                                      password VARCHAR(50) NOT NULL,
                                      role VARCHAR(50) NOT NULL,
                                      email VARCHAR(50) NOT NULL UNIQUE)''')


print("table created successfully")

cursor.execute('''
            CREATE TABLE IF NOT EXISTSS Employer(
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(50) NOT NULL UNIQUE) ''' )


cursor.execute('''

    CREATE TABLE IF NOT EXISTS Post(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        content VARCHAR(500) NOT NULL,
        username VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT,
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
''')
print("table post created successfully")


cursor.execute('''
    CREATE TABLE IF NOT EXISTS comments(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100) NOT NULL,
        post_id INT NOT NULL,
        username VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INT,
        FOREIGN KEY(post_id) REFERENCES Post(id),
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
''')
print("table comments created successfully")





print("table created successfully")
cursor.close()



