
from flask import Flask, request
from flask_cors import CORS
from json import dumps
from for_JWT_generating import ForJWTGenerating
from for_bd_connect import Database_manager
from validators import validate_username, validate_password



database = Database_manager()
app = Flask(__name__)
CORS(app)
jwt_generator = ForJWTGenerating()
@app.route("/auth", methods=['POST'])
def authorization():
  data = request.get_json()
  username = data['username']
  password = data['password']
  res = {"result": None,
         "jwtToken": None,
         "username": None}
  id_of_user = database.checking_for_authorized_user(username, password)
  if id_of_user == -1:
    res["result"] = 'invalid data'
  else:
    res["jwtToken"] = jwt_generator.generate_jwt_token(id_of_user)
    res["username"] = username
    res["result"] = 'success'
  return dumps(res)

@app.route('/user_data', methods=["POST"])
def returning_of_status_and_username():
  data = request.get_json()
  jwt_token = data['jwtToken']
  res = {"status": None,
         "username": None}
  if not jwt_generator.validate_token(jwt_token):
    res["status"] = 'invalid token'
    return dumps(res)
  res["status"] = 'success'
  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  username = database.get_username_by_id(user_id)
  res["username"] = username
  return dumps(res)

@app.route('/sign_up', methods=["POST"])
def sign_up():
  data = request.get_json()
  username = data['username']
  password = data['password']
  res = {'jwtToken': None,
         'result': None,
         'username': None}
  if not (validate_username(username) and validate_password(password)):
    res['result'] = 'invalid data'
    return dumps(res)
  if database.is_user_exists(username):
    res['result'] = 'user already exists'
    return dumps(res)
  user_id = database.adding_user(username, password)
  res['result'] = 'success'
  res['username'] = username
  res['jwtToken'] = jwt_generator.generate_jwt_token(user_id)
  return dumps(res)

if __name__ == "__main__":
  app.run()