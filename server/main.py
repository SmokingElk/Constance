
from flask import Flask, request, abort, make_response
from flask_cors import CORS
from for_JWT_generating import ForJWTGenerating
from for_bd_connect import Database_manager
from validators import validate_username, validate_password
from add_profile_image import add_profile_image
import datetime


database = Database_manager()
app = Flask(__name__, static_folder="static")
CORS(app)
jwt_generator = ForJWTGenerating()
@app.route("/api/v1/user/auth", methods=['GET'])
def authorization():
  data = request.args
  username = data.get("username")
  password = data.get("password")
  if not database.is_user_exists(username):
    abort(404)
  id_of_user = database.checking_for_authorized_user(username, password)
  if id_of_user == -1:
    abort(400)
  res = {"username": username,
         "jwtToken": jwt_generator.generate_jwt_token(id_of_user)}
  return make_response(res, 200)

@app.route('/api/v1/user/sign_up', methods=["POST"])
def sign_up():
  data = request.get_json()
  username = data['username']
  password = data['password']
  birth = data['birthdate']
  gender = data['sex']
  if not (validate_username(username) and validate_password(password)):
    abort(400)
  if database.is_user_exists(username):
    abort(409)
  birthdate_parts = list(map(int, birth.split('-')))
  d = datetime.datetime.now() - datetime.datetime(*birthdate_parts) < datetime.timedelta(days=365 * 18)
  if d:
    abort(400)
  user_id = database.adding_user(username, password, gender, birth)
  res = {'username': None,
         'jwtToken': None,
         }
  res['username'] = username
  res['jwtToken'] = jwt_generator.generate_jwt_token(user_id)
  return make_response(res, 201)

@app.route('/api/v1/profile/get_data_to_edit', methods=['GET'])
def get_user_profile_data():
  data = request.args
  jwt_token = data.get("jwt_Token")
  if not jwt_generator.validate_token(jwt_token):
    abort(401)
  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  if not database.is_user_exists_by_id(user_id):
    abort(404)
  profile_data = database.get_my_profile_data(user_id)
  adding_to_profile = {
    "firstname": profile_data[0],
    "lastname": profile_data[1],
    "social": profile_data[2],
    "phone": profile_data[3],
    "photo": profile_data[4],
  }
  return make_response(adding_to_profile, 200)

@app.route('/api/v1/profile/patch_text_data', methods=['PUT'])
def update_user_profile_data():
  data = request.get_json()
  jwt_token = data['jwtToken']
  patch = data['patch']
  if not jwt_generator.validate_token(jwt_token):
    abort(401)
  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  if not database.is_user_exists_by_id(user_id):
    abort(404)
  for key, value in patch.items():
    if key not in ['firstname', 'lastname', 'social', 'phone_number']:
      abort(400)
    database.patch_user_profile_data(user_id, key, value)
  return make_response(204)

@app.route('/api/v1/profile/set_photo', methods=['PUT'])
def update_user_profile_photo():
  token = request.form["jwtToken"]
  if not jwt_generator.validate_token(token):
    abort(401)
  user_id = jwt_generator.extract_payload(token)['userId']
  if not database.is_user_exists_by_id(user_id):
    abort(404)
  file = request.files["file"]
  name_of_image = add_profile_image(file)
  database.patch_user_profile_data(user_id, 'photo_name', name_of_image)
  res = {"photoName": name_of_image,
         }
  return make_response(res, 204)

@app.route('api/v1/profile/get_data_to_view/<int:userId>', methods=['GET'])
def get_watch_profile_data(userId):
  data = request.args
  jwt_token = data.get('jwtToken')
  if not jwt_generator.validate_token(jwt_token):
    abort(401)
  id_of_requested_user = userId
  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  if not database.is_user_exists_by_id(id_of_requested_user):
    abort(404)
  birth = database.getting_birthdate(id_of_requested_user)
  firstname, lastname, social, phone, photo_name = database.get_my_profile_data(id_of_requested_user)
  profile_data = {
    "firstname": firstname,
    "lastname": lastname,
    "social": social,
    "phone": phone,
    "birthdate": str(birth),
    "photoName": photo_name,
  }
  return make_response(profile_data, 200)

@app.route('/api/v1/user/primary_data', methods=['GET'])
def get_primary_data():
  data = request.args
  jwt_token = data.get("jwt_Token")

  if not jwt_generator.validate_token(jwt_token):
    abort(401)

  user_id = jwt_generator.extract_payload(jwt_token)['userId']
  user_data = database.get_primary_data(user_id)

  if user_data == -1:
    abort(404)

  data_for_return = {"username": user_data[0],
                     "birthdate": user_data[2],
                     "sex": user_data[1],
                     }
  return make_response(data_for_return, 200)


if __name__ == "__main__":
  app.run()