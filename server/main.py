
from flask import Flask, request, abort, make_response
from flask_cors import CORS
from for_JWT_generating import ForJWTGenerating
from for_bd_connect import DatabaseManager
from validators import validate_username, validate_password
from add_profile_image import add_profile_image
import datetime
from prometheus_client import start_http_server, Counter

REQUESTS_FOR_SIGN_UP = Counter('sign_up_count',
                   'Total number of sign up requests')
REQUESTS_FOR_PATCH_CHARS = Counter('patch_chars_count',
                   'Total number of patching characteristics requests')
REQUESTS_FOR_PATCH_PREFS = Counter('patch_prefs_count',
                   'Total number of patching preferences requests')
REQUESTS_FOR_SEARCH = Counter('search_count',
                   'Total number of searching requests')
database = DatabaseManager()
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
    user_id = database.checking_for_authorized_user(username, password)
    if user_id == -1:
        abort(400)
    data = database.get_primary_data(user_id)
    sex = data[1]
    date_of_birth = data[2]
    res = {"username": username,
           "jwtToken": jwt_generator.generate_jwt_token(user_id),
           "sex": sex,
           "birthdate": date_of_birth
           }
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
    res = {'username': username,
           'jwtToken': jwt_generator.generate_jwt_token(user_id),
           'birthdate': birth,
           'sex': gender
           }
    database.set_chars(user_id, 0, {'value': 18})
    database.set_prefs(user_id, 0, {'positiveScale': 1.0})
    REQUESTS_FOR_SIGN_UP.inc()
    return make_response(res, 201)


@app.route('/api/v1/profile/get_data_to_edit', methods=['GET'])
def get_user_profile_data():
    data = request.args
    jwt_token = data.get("jwtToken")
    if not jwt_generator.validate_token(jwt_token):
        abort(401)
    user_id = jwt_generator.extract_payload(jwt_token)['userId']
    if not database.is_user_exists_by_id(user_id):
        abort(404)
    profile_data = database.get_my_profile_data(user_id)
    adding_to_profile = {"firstname": profile_data[0],
                         "lastname": profile_data[1],
                         "social": profile_data[2],
                         "phone": profile_data[3],
                         "photo": profile_data[4],
                         "about_me": profile_data[5],
                         "location": profile_data[6]
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
        if key not in ['firstname', 'lastname', 'social', 'phone_number', 'about_me', 'location']:
            abort(400)
        database.patch_user_profile_data(user_id, key, value)
    return make_response({}, 200)


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
    return make_response(res, 200)


@app.route('/api/v1/profile/get_data_to_view/<int:user_id>', methods=['GET'])
def get_watch_profile_data(user_id: int):
    data = request.args
    jwt_token = data.get('jwtToken')
    if not jwt_generator.validate_token(jwt_token):
        abort(401)
    id_of_requested_user = user_id
    if not database.is_user_exists_by_id(id_of_requested_user):
        abort(404)
    birth = database.getting_birthdate(id_of_requested_user)
    (firstname, lastname, social, phone, photo_name, about_me,
     location) = database.get_my_profile_data(id_of_requested_user)
    profile_data = {"firstname": firstname,
                    "lastname": lastname,
                    "social": social,
                    "phone": phone,
                    "birthdate": str(birth),
                    "photoName": photo_name,
                    "username": database.get_primary_data(id_of_requested_user)[0],
                    "about_me": about_me,
                    "location": location
                    }
    return make_response(profile_data, 200)


@app.route('/api/v1/user/primary_data', methods=['GET'])
def get_primary_data():
    data = request.args
    jwt_token = data.get("jwtToken")
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


@app.route('/api/v1/chars/get_all', methods=['GET'])
def get_all_chars():
    data = request.args
    jwt_token = data.get("jwtToken")
    if not jwt_generator.validate_token(jwt_token):
        abort(401)
    user_id = jwt_generator.extract_payload(jwt_token)['userId']
    user_data = database.get_primary_data(user_id)
    if user_data == -1:
        abort(404)
    data = database.getting_all_chars(user_id)
    return make_response(data, 200)


@app.route('/api/v1/chars/patch_chars', methods=['PUT'])
def patch_chars():
    data = request.get_json()
    jwt_token = data['jwtToken']
    id_of_char = data['id']
    patch = {'value': data['value']}
    if not jwt_generator.validate_token(jwt_token):
        abort(401)
    user_id = jwt_generator.extract_payload(jwt_token)['userId']
    if not database.is_user_exists_by_id(user_id):
        abort(404)
    database.set_chars(user_id, id_of_char, patch)
    REQUESTS_FOR_PATCH_CHARS.inc()
    return make_response({}, 200)


@app.route('/api/v1/prefs/get_all', methods=['GET'])
def get_all_prefs():
    data = request.args
    jwt_token = data.get("jwtToken")
    if not jwt_generator.validate_token(jwt_token):
        abort(401)
    user_id = jwt_generator.extract_payload(jwt_token)['userId']
    user_data = database.get_primary_data(user_id)
    if user_data == -1:
        abort(404)
    data = database.getting_all_prefs(user_id)
    return make_response(data, 200)


@app.route('/api/v1/prefs/patch_pref', methods=['PUT'])
def patch_pref():
    data = request.get_json()
    jwt_token = data['jwtToken']
    id_of_pref = data['id']
    patch = data['patch']
    if not jwt_generator.validate_token(jwt_token):
        abort(401)
    user_id = jwt_generator.extract_payload(jwt_token)['userId']
    if not database.is_user_exists_by_id(user_id):
        abort(404)
    database.set_prefs(user_id, id_of_pref, patch)
    REQUESTS_FOR_PATCH_PREFS.inc()
    return make_response({}, 200)


@app.route('/api/v1//search/get_pack', methods=['GET'])
def search():
    data = request.args
    jwt_token = data.get("jwtToken")
    pack_number = int(data['pack_number'])
    if not jwt_generator.validate_token(jwt_token):
        abort(401)
    user_id = jwt_generator.extract_payload(jwt_token)['userId']
    data_to_return = database.get_search_data(user_id, pack_number)
    REQUESTS_FOR_SEARCH.inc()
    return make_response(data_to_return, 200)


if __name__ == "__main__":
    start_http_server(8000)
    app.run()
