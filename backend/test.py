import requests

url = "http://127.0.0.1:5000/login"

data = {
  "user_name": "test",
  "password": "password",
}

r = requests.post(url, json=data)

print(r.status_code)