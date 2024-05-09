import pytest
from server.validators import *


class TestValidators:
    @pytest.mark.parametrize(
        'ind, ans',
        [
            ('Test1234', True),
            ('test1234', False),
            ('test123', False),
            ('Test123', False),
        ]
    )
    def test_validate_password(self, ind, ans):
        assert validate_password(ind) == ans

    @pytest.mark.parametrize(
        'ind, ans',
        [
            ('user1', True),
            ('1234', True),
            ('username', True),
            ('Username', True),
        ]
    )
    def test_validate_username(self, ind, ans):
        assert validate_username(ind) == ans
