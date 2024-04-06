
from flask import Flask, request
from flask_cors import CORS
from json import dumps
from for_JWT_generating import ForJWTGenerating
from for_bd_connect import Database_manager
from validators import validate_username, validate_password
from add_profile_image import add_profile_image
import datetime


database = Database_manager()
app = Flask(__name__, static_folder="static")
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
  birth = data['birthdate']
  gender = data['gender']
  res = {'jwtToken': None,
         'result': None,
         'username': None}
  if not (validate_username(username) and validate_password(password)):
    res['result'] = 'invalid data'
    return dumps(res)
  if database.is_user_exists(username):
    res['result'] = 'user already exists'
    return dumps(res)
  birthdate_parts = list(map(int, birth.split('-')))
  d = datetime.datetime.now() - datetime.datetime(*birthdate_parts) < datetime.timedelta(days=365 * 18)
  if d:
    res['result'] = 'younger than 18 are prohibited'
    return dumps(res)
  user_id = database.adding_user(username, password, gender, birth)
  res['result'] = 'success'
  res['username'] = username
  res['jwtToken'] = jwt_generator.generate_jwt_token(user_id)
  return dumps(res)

@app.route('/get_user_profile_data', methods=['POST'])
def get_user_profile_data():
  data = request.get_json()
  jwt_token = data['jwtToken']
  res = {"result": None,
         "profile": None}
  if not jwt_generator.validate_token(jwt_token):
    res["result"] = 'invalid token'
    return dumps(res)
  res["result"] = 'success'
  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  profile_data = database.get_my_profile_data(user_id)
  print(profile_data)
  adding_to_profile = {
    "firstname": profile_data[0],
    "lastname": profile_data[1],
    "social": profile_data[2],
    "phone": profile_data[3],
    "photo": profile_data[4],
  }
  res['profile'] = adding_to_profile
  return dumps(res)

@app.route('/update_user_profile_data', methods=['POST'])
def update_user_profile_data():
  data = request.get_json()
  jwt_token = data['jwtToken']
  patch = data['patch']
  res = {"result": None,
         }
  if not jwt_generator.validate_token(jwt_token):
    res["result"] = 'invalid token'
    return dumps(res)
  res["result"] = 'success'
  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  for key, value in patch.items():
    database.patch_user_profile_data(user_id, key, value)
  return dumps(res)

@app.route('/update_user_profile_photo', methods=['POST'])
def update_user_profile_photo():
  token = request.form["jwtToken"]
  res = {"result": "...",
         "photoName": "...",
  }
  if not jwt_generator.validate_token(token):
    res["result"] = 'invalid token'
    return dumps(res)
  res["result"] = 'success'
  user_id = jwt_generator.extract_payload(token)['userId']
  file = request.files["file"]
  name_of_image = add_profile_image(file)
  database.patch_user_profile_data(user_id, 'photo_name', name_of_image)
  res['photoName'] = name_of_image
  return dumps(res)

@app.route('/get_watch_profile_data')
def get_watch_profile_data():
  data = request.get_json()
  jwt_token = data['jwtToken']
  res = {
  "result": "...",
  "profileData": None,
  }
  if not jwt_generator.validate_token(jwt_token):
    res["result"] = 'user is not login'
    return dumps(res)
  id_of_requested_user = data['id']
  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  if not database.is_user_exists_by_id(id_of_requested_user):
    res['result'] = 'requested user does not exist'
    return dumps(res)
  birth = database.getting_birthdate(id_of_requested_user)
  res['result'] = 'success'
  firstname, lastname, social, phone, photo_name = database.get_my_profile_data(id_of_requested_user)
  profile_data = {
    "firstname": firstname,
    "lastname": lastname,
    "social": social,
    "phone": phone,
    "birthdate": birth,
    "photoName": photo_name,
  }
  res['profileData'] = profile_data
  return dumps(res)


if __name__ == "__main__":
  app.run()