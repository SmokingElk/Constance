import pytest
from server.for_JWT_generating import ForJWTGenerating
f = ForJWTGenerating()


class TestForJWTGenerating:
    @pytest.mark.parametrize(
        "ind, ans",
        [
            ('2', 'MNZGSekXJxpea7d0CDlliaVB4nmG7Z+UKOC1CSK2iZ4='),
            ('5757557', 'LxFsJz4rdGb6Ww7dR13s6sXf0WE7vT2H+Pz0/NkOrOA='),
            ('AAAA', 'dO+TNH8ZCRYjwl+Q4HMD/nUz4XXSouUXtHFVUN5zCYY=')
        ]
    )
    def test_create_signature(self, ind, ans):
        assert f.create_signature(ind) == ans

    @pytest.mark.parametrize(
        "ind, ans",
        [
            ('2', 'Mg=='),
            ('5757557', 'NTc1NzU1Nw=='),
            ('AAAA', 'QUFBQQ==')
        ]
    )
    def test_encode_base64(self, ind, ans):
        assert f.encode_base64(ind) == ans

    @pytest.mark.parametrize(
        "ans, ind",
        [
            ('2', 'Mg=='),
            ('5757557', 'NTc1NzU1Nw=='),
            ('AAAA', 'QUFBQQ==')
        ]
    )
    def test_decode_base64(self, ind, ans):
        assert f.decode_base64(ind) == ans

    @pytest.mark.parametrize(
        "ans, ind",
        [
         (True,
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiAyfQ==.3MD6U9IP0kGKB7oSngx8GvfLmexZc6UPnQIeQjvo8LE='),
         (True,
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiA1fQ==.yr5Vbu7TmOe0XTFvYgwi2l9zs4pZZp6v0aBGyrc0caA='),
         (None,
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9eyJ1c2VySWQiOiAyMH0=.IfZUuRQR3NzrICYxLSyIibQkXEsaQRq+aLS42dGnmeU=')
        ]
    )
    def test_validate_token(self, ind, ans):
        assert f.validate_token(ind) == ans

    @pytest.mark.parametrize(
        "ans, ind",
        [
         ({'userId': 2},
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiAyfQ==.3MD6U9IP0kGKB7oSngx8GvfLmexZc6UPnQIeQjvo8LE='),
         ({'userId': 5},
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiA1fQ==.yr5Vbu7TmOe0XTFvYgwi2l9zs4pZZp6v0aBGyrc0caA='),
         ({'userId': 20},
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiAyMH0=.IfZUuRQR3NzrICYxLSyIibQkXEsaQRq+aLS42dGnmeU=')
        ]
    )
    def test_extract_payload(self, ind, ans):
        assert f.extract_payload(ind) == ans

    @pytest.mark.parametrize(
        "ind, ans",
        [
         (2,
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiAyfQ==.3MD6U9IP0kGKB7oSngx8GvfLmexZc6UPnQIeQjvo8LE='),
         (5,
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiA1fQ==.yr5Vbu7TmOe0XTFvYgwi2l9zs4pZZp6v0aBGyrc0caA='),
         (20,
          'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiAyMH0=.IfZUuRQR3NzrICYxLSyIibQkXEsaQRq+aLS42dGnmeU=')
        ]
    )
    def test_generate_token(self, ind, ans):
        assert f.generate_jwt_token(ind) == ans

