import json

from flask import Flask, request
from flask_cors import CORS
from for_bd_connect import checking_for_authorized_user
from json import dumps


app = Flask(__name__)
CORS(app)

@app.route("/auth", methods=['POST'])
def authorization():
  data = request.get_json()
  username = data['username']
  password = data['password']
  res = {"result": None}
  if checking_for_authorized_user(username, password) == -1:
    res["result"] = 'invalid data'
  else:
    res["result"] = 'success'
  return dumps(res)



if __name__ == "__main__":
  app.run()