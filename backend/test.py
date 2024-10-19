import requests

url = "http://127.0.0.1:5000/register"

data = {
  "user_name": "test",
  "password": "password",
  "email": "testemail@email.com"
}

r = requests.post(url, json=data)

print(r.status_code)