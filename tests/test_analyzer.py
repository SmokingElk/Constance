import pytest
from server.analyzer import Analyzer
a = Analyzer()


class TestAnalyzer:
    @pytest.mark.parametrize(
        "ind, ans",
        [
         (2, 'discrete'),
         (5, 'continuous'),
         (21, 'binary')
        ]
    )
    def test_get_datatype(self, ind, ans):
        assert a.get_datatype(ind) == ans

    @pytest.mark.parametrize(
        "ind, ans",
        [
            (2, 'Нейтральное'),
            (5, 70),
            (21, True)
        ]
    )
    def test_get_default(self, ind, ans):
        assert a.get_default(ind) == ans

    @pytest.mark.parametrize(
        "ind, ans",
        [
            (2, 'worldview'),
            (5, 'appearance'),
            (28, 'personality')
        ]
    )
    def test_get_group(self, ind, ans):
        assert a.get_group(ind) == ans

    @pytest.mark.parametrize(
        "ind, key, ans",
        [
            (2, 'spreadPoints', [1.0 for _ in range(50)]),
            (5, 'columnCoefs', [1.0 for _ in range(50)]),
            (28, 'columnCoefs', [1.0 for _ in range(50)])
        ]
    )
    def test_get_data(self, ind, key, ans):
        assert a.get_data(ind, key) == ans
