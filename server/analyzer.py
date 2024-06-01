import json
PROPERTIES_FILE_PATH = './static/properties_data.json'


class Analyzer:
    """
    Класс, который предназначен для работы с json файлом(properties_data.json)
    """
    def __init__(self):
        f = open(PROPERTIES_FILE_PATH, encoding='utf-8')
        f = f.read()
        self.a = json.loads(f)

    def get_datatype(self, i: int) -> str:
        """
        Функция, которая возвращает тип признака по его номеру
        Parameters
        ----------
        i : int
            номер признака, тип которого мы хотим получить
        Returns
        -------
        str
            получаем тип признака: binary, continious or discrete
        Examples
        --------
        >>> Analyzer.get_datatype(1)
        "discrete"
        >>> Analyzer.get_datatype(5)
        "continuous"
        >>> Analyzer.get_datatype(21)
        "binary"
        """
        b = self.a['propertiesData']
        c = b[int(i)]['type']
        return c

    def get_default(self, i: int):
        """
        Функция, которая возвращает дефолтное значение признака по его номеру
        Parameters
        ----------
        i : int
            номер признака, дефолтное значение которого мы хотим получить
        Returns
        -------
        str, bool, int
            получаем дефолтное значение признака
        Examples
        --------
        >>> Analyzer.get_default(21)
        true
        >>> Analyzer.get_default(22)
        "Меломан"
        >>> Analyzer.get_default(0)
        18
        """
        b = self.a['propertiesData']
        c = b[i]['type']
        if c == 'binary' or c == 'discrete':
            return b[i]['default']
        else:
            if c == 'continuous' and isinstance(b[i]['averageValue'], str):
                mn = b[i]['range']['min']
                mx = b[i]['range']['max']
                return (mn + mx) / 2
            else:
                return b[i]["averageValue"]

    def get_group(self, i: int) -> str:
        """
        Функция, которая возвращает группу признака по его номеру
        Parameters
        ----------
        i : int
            номер признака, группу которого мы хотим получить
        Returns
        -------
        str
            получаем группу признака
        Examples
        --------
        >>> Analyzer.get_group(21)
        "worldview"
        """
        b = self.a['propertiesData']
        c = b[i]['group']
        return c

    def get_data(self, i: int, key: str) -> list:
        """
        Функция, которая возвращает список коэфициентов, которые стоят изначально перед настройкой предпочтений
        Parameters
        ----------
        i : int
            номер признака, группу которого мы хотим получить
        key : str
            spreadPoints или columnCoefs, в зависимости от признака
        Returns
        -------
        list
            получаем список коэфициентов в зависимости от типа признака
        Examples
        --------
        >>> Analyzer.get_data(28)
        буден выведен список [1.0, 1.0, ....] длинной 50
        """
        b = self.a['propertiesData']
        if key == 'columnsCoefs':
            lst = b[i]['variants']
            new = [1.0 for _ in range(len(lst))]
        else:
            new = [1.0 for _ in range(self.a['globalParams']['segmentsInPartion'])]
        return new
