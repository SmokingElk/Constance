import psycopg2
import configparser
import json
import time
PROPERTIES_FILE_PATH = './static/properties_data.json'


class GetterOfRates:
    """
    Класс для подстчёта рейтинга пары, а также вывода списка найденных пользователей
    """
    def __init__(self):
        """
        инициализация класса, мы открываем cfg файл, в котором указаны настрйоки базы данных,
        а также обьявляем таблицу, в которой будем хранить уже просчитанные значения, т.е. кэширование
        """
        config = configparser.ConfigParser()
        config.read('for_bd.cfg')
        data_base_name = config.get('Settings_of_bd', 'dbname')
        username_of_database = config.get('Settings_of_bd', 'user')
        password_of_database = config.get('Settings_of_bd', 'password')
        name_of_host = config.get('Settings_of_bd', 'host')
        self.conn = psycopg2.connect(dbname=data_base_name, user=username_of_database,
                                     password=password_of_database, host=name_of_host)
        self.date_of_last_change = 0
        self.data_cache = []

    def __del__(self):
        """
        закрытие курсора после завершении работы над экземпляром класса
        """
        self.conn.close()

    def get_rates(self, prefs_of_id: list, user_id: int) -> list:
        """
        функция, которая возвращает список пользователей, которые должны отображаться
        при поиске, если данные не просчитаны, или не актуальны, то они пересчитываются, в противном случае,
        берутся из кэша
        Parameters
        ----------
        user_id : int
            id пользователя, относительно которого ведётся поиск
        prefs_of_id: list
            предпочтения пользователя
        Returns
        -------
        list
            получаем результат поиска
        """
        if user_id in [i[0] for i in self.data_cache]:
            last_data = self.data_finder(user_id)
            date_of_last_count = last_data[2]
            self.data_cache.remove(last_data)
            if date_of_last_count > self.date_of_last_change:
                last_data[2] = time.time()
                if len(self.data_cache) >= 100:
                    self.data_cache.pop(0)
                self.data_cache.append(last_data)
            else:
                new_data_to_change = self.counter(user_id, prefs_of_id)
                if len(self.data_cache) >= 100:
                    self.data_cache.pop(0)
                self.data_cache.append(new_data_to_change)
        else:
            ans = self.counter(user_id, prefs_of_id)
            if len(self.data_cache) >= 100:
                self.data_cache.pop(0)
            self.data_cache.append(ans)
        data_from_cache = self.data_finder(user_id)[1]
        data_for_return = []
        for key, _value in data_from_cache.items():
            res = {'id': key,
                   'rate': data_from_cache[key][0],
                   'ts': data_from_cache[key][1],
                   }
            data_for_return.append(res)
        return data_for_return

    @staticmethod
    def func(ans_dict_1: float, ans_dict_2: float):
        """
        подсчёт данных по формуле, которую мы задаём, чтобы узнать рейтинг пары
        """
        return (ans_dict_1 + ans_dict_2) / 2 ** ((ans_dict_1 - ans_dict_2) ** 2)

    @staticmethod
    def get_index_for_descrete(i: int, v: str) -> int:
        """
        аналогичная функция get_index_for_cointinious, только для дискретных признаков, она ищет индекс
        значения в столбце конкретных параметров определённого признака
        Parameters
        ----------
        v: str
            название параметра
        i: int
            номер характеристики в списке для удобства поиска
        Returns
        -------
        int
            если нашёлся такой параметр признакв, то возвращается его индекс в списке значений этого признака
        """

        file = open(PROPERTIES_FILE_PATH, encoding='utf-8')
        a = file.read()
        a = json.loads(a)
        b = a['propertiesData']
        variants = b[i]['variants']
        file.close()
        for j in range(0, len(variants)):
            if variants[j] == v:
                return j
        return False

    @staticmethod
    def get_index_for_continious(value: float, list_spread: list, i: int) -> float:
        """
        функция реализует метод интерполяции для получения результата на определённую позицию предпочтений
        , а также для точности вычислений рейтинга пары
        Parameters
        ----------
        value: float
            значение параметра
        list_spread: list
            текущие столбцы spreadPoints
        i: int
            номер характеристики в списке для удобства поиска
        Returns
        -------
        float
            значение, через которое далее будет высчитываться рейтинг пары
        """
        file = open(PROPERTIES_FILE_PATH, encoding='utf-8')
        a = file.read()
        a = json.loads(a)
        b = a['propertiesData']
        file.close()
        value = float(value)
        variants_min = b[i]['range']['min']
        variants_max = b[i]['range']['max']
        range_len = abs(float(variants_max) - float(variants_min))
        spread_len = range_len / (len(list_spread) - 1)
        left = (float(value) - float(variants_min)) // spread_len
        right = left + 1.0
        y_0 = float(list_spread[int(left)])
        y_1 = float(list_spread[int(right)])
        x_0 = float(variants_min) + float(left * spread_len)
        x_1 = float(variants_max) + float(right * spread_len)
        f_x = y_0 + (y_1 - y_0) / (x_1 - x_0) * (value - x_0)
        return f_x

    def count_rate(self, chars: list, prefs: list) -> float:
        """
        функция, которая считает рейтинг пользователя и его совместимость под требования
        Parameters
        ----------
        chars : list
            список характеристик пользователя
        prefs: list
            список предпочтений пользователя
        Returns
        -------
        float
            получаем конкретное число, которое показывает, насколько пользователь подходит
             под предпочтения другого пользователя
        """
        n_f_of_id = 0.0
        for i in prefs:
            n_f_of_id += max(abs(i['positiveScale']), abs(i['negativeScale']))
        ans_value = 0.0

        for i in range(len(prefs)):
            if chars[i]['charType'] == 'binary':
                if chars[i]['value']:
                    ans_value += prefs[i]['positiveScale'] / n_f_of_id
                else:
                    ans_value -= prefs[i]['negativeScale'] / n_f_of_id
            elif chars[i]['charType'] == 'discrete':
                v = chars[i]['value']
                ind = self.get_index_for_descrete(i, v)
                value_of_coef = float(prefs[i]['columnsCoefs'][ind])
                if value_of_coef >= 0:
                    ans_value += float(prefs[i]['positiveScale']) * float(value_of_coef) / n_f_of_id
                else:
                    ans_value += float(prefs[i]['negativeScale']) * float(value_of_coef) / n_f_of_id
            elif chars[i]['charType'] == 'continuous':
                cur_char = chars[i]['value']
                spread = prefs[i]['spreadPoints']
                res = self.get_index_for_continious(cur_char, spread, i)
                
                if res >= 0:
                    ans_value += float(prefs[i]['positiveScale']) * float(res) / n_f_of_id
                else:
                    ans_value += float(prefs[i]['negativeScale']) * float(res) / n_f_of_id

        return ans_value

    def getter_of_last_update_in_tables(self, date_of_change: float):
        """
        функия меняет дату последнего обновления, при применении этой функции
        атрибут self.date_of_change меняется, этот параметр важен для кеширования и проверке
        на актуальность данных
        Parameters
        ----------
        date_of_change : int
        """
        self.date_of_last_change = date_of_change

    def data_finder(self, user_id: int) -> list:
        for i in self.data_cache:
            if i[0] == user_id:
                return i
        return []

    def counter(self, user_id: int, prefs_of_id: list) -> list:
        """
        функция, которая выполняет пересчёт рейтинга пар и совместимость пользователя с другими
        Parameters
        ----------
        user_id : int
            id пользователя, относительно которого ведётся поиск
        prefs_of_id: list
            предпочтения пользователя
        Returns
        -------
        list
            получаем результат поиска в виде [id пользователя, словарь с рейтингами
        """
        cursor = self.conn.cursor()
        cursor.execute('''SELECT id, "Gender" FROM "Autorisation"''')
        records = list(cursor.fetchall())
        cursor.execute('''SELECT id, include_in_search FROM "profile_data"''')
        include_or_not = list(cursor.fetchall())
        set_of_search_users = set([i[0] for i in include_or_not if i[1]])
        user_gender = [i[1] for i in records if i[0] == user_id][0]
        lst_of_users = [i[0] for i in records if i[1] != user_gender and i[0] in set_of_search_users]
        ans = []
        for_sort = []
        cursor.execute('''SELECT * FROM "characteristics" WHERE id=%s''', (user_id,))
        chars_of_user = list(cursor.fetchall())[0][1:]
        for i in lst_of_users:
            cursor.execute('''SELECT * FROM "characteristics" WHERE id=%s''', (i,))
            chars_of_current = list(cursor.fetchall())[0][1:]
            cursor.execute('''SELECT * FROM "preferences" WHERE id=%s''', (i,))
            prefs_of_current = list(cursor.fetchall())[0][1:]
            rate_1_2 = self.count_rate([json.loads(i) for i in chars_of_current],
                                       [json.loads(i) for i in prefs_of_id])
            rate_2_1 = self.count_rate([json.loads(i) for i in chars_of_user],
                                       [json.loads(i) for i in prefs_of_current])
            t_s = self.func(rate_1_2, rate_2_1)
            res = {
                'id': i,
                'rate': rate_1_2,
                'ts': t_s
            }
            for_sort.append([i, t_s])
            ans.append(res)
        for_sort = sorted(for_sort, key=lambda x: x[1], reverse=True)
        data_for_return = []
        for i in for_sort:
            for j in ans:
                if i[0] == j['id']:
                    data_for_return.append(j)
        new_data = {}
        for i in data_for_return:
            new_data[i['id']] = [i['rate'], i['ts']]
        return [user_id, new_data, int(time.time())]
