from flask import Flask, render_template
from flask_cors import CORS

client = Flask(__name__, template_folder='client_build', static_folder="client_build/static")
CORS(client)


@client.route("/", methods=['GET'])
@client.route("/<path:path>", methods=['GET'])
def home(path="/"):
    return render_template("index.html")


if __name__ == "__main__":
    client.run(port=3000)
