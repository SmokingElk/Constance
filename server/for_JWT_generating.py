import base64
from json import dumps, loads
import hashlib
import hmac
import configparser


class ForJWTGenerating:
    """
    класс для генерации JWТ токена
    """
    def __init__(self):
        """
        инициализируем класс, открываем файл, в котором хранится jwt ключ, обьявляем атрибут класса,
        в котором будет храниться ключ
        """
        config = configparser.ConfigParser()
        config.read('keys.cfg')
        self.key = config.get('Settings_of_keys', 'jwt_key').encode('ascii')

    def create_signature(self, to_sign: str) -> str:
        """
        функция для создания signature
        Parameters
        ----------
        to_sign : str
            строка, над которой нужно совершить работу
        Returns
        -------
        str
            получаем signature
        Examples
        --------
        >>> ForJWTGenerating.create_signature('AAAA')
        "'dO+TNH8ZCRYjwl+Q4HMD/nUz4XXSouUXtHFVUN5zCYY='"
        """
        to_sign_in_ascii = to_sign.encode('ascii')
        digest = hmac.new(self.key, msg=to_sign_in_ascii, digestmod=hashlib.sha256).digest()
        signature = base64.b64encode(digest).decode()
        return signature

    @staticmethod
    def encode_base64(something: str):
        """
        функция кодирования
        Parameters
        ----------
        something : str
            строка, которую нужно закодировать
        Returns
        -------
        str
            получаем закодированную строку
        Examples
        --------
        >>> ForJWTGenerating.encode_base64('AAAA')
        'QUFBQQ=='
        """
        message_bytes = something.encode('ascii')
        base64_bytes = base64.b64encode(message_bytes)
        base64_message = base64_bytes.decode('ascii')
        return base64_message

    @staticmethod
    def decode_base64(something_encoded: str):
        """
        функция декодирования
        Parameters
        ----------
        something_encoded : str
            строка, которую нужно декодировать
        Returns
        -------
        str
            получаем декодированную строку
        Examples
        --------
        >>> ForJWTGenerating.decode_base64('QUFBQQ==')
        'AAAA'
        """
        base64_bytes = something_encoded.encode('ascii')
        message_bytes = base64.b64decode(base64_bytes)
        mes_dec = message_bytes.decode('ascii')
        return mes_dec

    def generate_jwt_token(self, user_id: int) -> str:
        """
        генерация JWT токена по id
        Parameters
        __________
        user_id : int
            id пользователя, по котоорому будем генерровать
        Returns
        -------
        str
            получаем сгенерированный токен
        Examples
        --------
        >>> ForJWTGenerating.generate_jwt_token(2)
        'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiAyfQ==.3MD6U9IP0kGKB7oSngx8GvfLmexZc6UPnQIeQjvo8LE='
        """
        header = {"alg": "HS256", "typ": "JWT"}
        payload = {"userId": user_id}
        head = dumps(header)
        payl = dumps(payload)
        jwt = self.encode_base64(head) + '.' + self.encode_base64(payl)
        signature = self.create_signature(jwt)
        return jwt + '.' + signature

    def validate_token(self, token):
        """
        функция проверки на корректность JWT токена
        Parameters
        __________
        token : str
            JWT токен, который нужно проверить
        Returns
        -------
        bool
            True, если токен корректен, None, если нет
        """
        try:
            header, payload, signature = token.split(".")
            signature_new = self.create_signature(header + '.' + payload)
            return signature == signature_new
        except Exception:
            return None

    def extract_payload(self, token):
        try:
            header, payload, signature = token.split(".")
            decoded_payload = self.decode_base64(payload)
            return loads(decoded_payload)
        except Exception:
            return None
