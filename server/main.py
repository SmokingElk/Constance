from flask import Flask, request
from flask_cors import CORS
from for_bd_connect import checking_for_authorized_user

app = Flask(__name__)
CORS(app)

@app.route("/auth", methods=['POST'])
def authorization():
  data = request.get_json()
  username = data['username']
  password = data['password']
  if checking_for_authorized_user(username, password) == -1:
    return 'invalid data'
  else:
    return 'success'


if __name__ == "__main__":
  app.run()