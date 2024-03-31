import base64
from json import dumps, loads
import hashlib
import hmac
import configparser

class ForJWTGenerating:
    def __init__(self):
        config = configparser.ConfigParser()
        config.read('keys.cfg')
        self.key = config.get('Settings_of_keys', 'jwt_key').encode('ascii')

    def create_signature(self, to_sign: str) -> str:
        to_sign_in_ascii = to_sign.encode('ascii')
        digest = hmac.new(self.key, msg=to_sign_in_ascii, digestmod=hashlib.sha256).digest()
        signature = base64.b64encode(digest).decode()
        return signature


    def encode_base64(self, something: str):
        message_bytes = something.encode('ascii')
        base64_bytes = base64.b64encode(message_bytes)
        base64_message = base64_bytes.decode('ascii')
        return base64_message

    def decode_base64(self, something_encoded: str):
        base64_bytes = something_encoded.encode('ascii')
        message_bytes = base64.b64decode(base64_bytes)
        mes_dec = message_bytes.decode('ascii')
        return mes_dec


    def generate_jwt_token(self, id: int):
        header = {"alg": "HS256", "typ": "JWT"}
        payload = {"userId": id}
        head = dumps(header)
        payl = dumps(payload)
        jwt = self.encode_base64(head) + '.' + self.encode_base64(payl)
        signature = self.create_signature(jwt)
        return jwt + '.' + signature

    def validate_token(self, token):
        try:
            header, payload, signature = token.split(".")
            signature_new = self.create_signature(header + '.' + payload)
            return signature == signature_new
        except:
            return False

    def extract_payload(self, token):
        try:
            header, payload, signature = token.split(".")
            decoded_payload = self.decode_base64(payload)
            return loads(decoded_payload)
        except:
            return None


