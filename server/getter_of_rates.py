import psycopg2
import configparser
import json


class GetterOfRates:
    def __init__(self):
        config = configparser.ConfigParser()
        config.read('for_bd.cfg')
        data_base_name = config.get('Settings_of_bd', 'dbname')
        username_of_database = config.get('Settings_of_bd', 'user')
        password_of_database = config.get('Settings_of_bd', 'password')
        name_of_host = config.get('Settings_of_bd', 'host')
        self.conn = psycopg2.connect(dbname=data_base_name, user=username_of_database,
                                     password=password_of_database, host=name_of_host)

    def __del__(self):
        self.conn.close()

    def get_rates(self, prefs_of_id, user_id):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT id, "Gender" FROM "Autorisation"''')
        records = list(cursor.fetchall())
        user_gender = [i[1] for i in records if i[0] == user_id][0]
        lst_of_users = [i[0] for i in records if i[1] != user_gender]
        ans = []
        for_sort = []
        cursor.execute('''SELECT * FROM "characteristics" WHERE id=%s''', (user_id,))
        chars_of_user = list(cursor.fetchall())[0][1:]
        for i in lst_of_users:
            cursor.execute('''SELECT * FROM "characteristics" WHERE id=%s''', (i, ))
            chars_of_current = list(cursor.fetchall())[0][1:]
            cursor.execute('''SELECT * FROM "preferences" WHERE id=%s''', (i,))
            prefs_of_current = list(cursor.fetchall())[0][1:]
            rate_1_2 = self.count_rate([json.loads(i) for i in chars_of_current], [json.loads(i) for i in prefs_of_id])
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
        return data_for_return

    @staticmethod
    def func(ans_dict_1: float, ans_dict_2: float):
        return (ans_dict_1 + ans_dict_2) / 2 ** ((ans_dict_1 - ans_dict_2) ** 2)

    @staticmethod
    def get_index_for_descrete(i: int, v: str) -> int:
        a = open('properties_data.json', encoding='utf-8')
        a = a.read()
        a = json.loads(a)
        b = a['propertiesData']
        variants = b[i]['variants']
        a.close()
        for j in range(0, len(variants)):
            if variants[j] == v:
                return j
        raise AssertionError()

    @staticmethod
    def get_index_for_continious(value, list_spread, i: int) -> float:
        a = open('properties_data.json', encoding='utf-8')
        a = a.read()
        a = json.loads(a)
        b = a['propertiesData']
        a.close()
        value = float(value)
        variants_min = b[i]['range']['min']
        variants_max = b[i]['range']['max']
        range_len = abs(float(variants_max) - float(variants_min))
        spread_len = range_len / (len(list_spread) - 1)
        left = (float(value) - variants_min) // spread_len
        right = left + 1.0
        y_0 = list_spread[left]
        y_1 = list_spread[right]
        x_0 = variants_min + left * spread_len
        x_1 = variants_max + right * spread_len
        f_x = y_0 + (y_1 - y_0) / (x_1 - x_0) * (value - x_0)
        return f_x

    def count_rate(self, chars, prefs):
        n_f_of_id = 0.0
        for i in prefs:
            n_f_of_id += i['positiveScale']
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
                    ans_value -= float(prefs[i]['negativeScale']) * float(value_of_coef) / n_f_of_id
            elif chars[i]['charType'] == 'continious':
                cur_char = chars[i]['value']
                spread = prefs[i]['spreadPoints']
                res = self.get_index_for_continious(cur_char, spread, i)
                if res >= 0:
                    ans_value += float(prefs[i]['positiveScale']) * float(res) / n_f_of_id
                else:
                    ans_value -= float(prefs[i]['negativeScale']) * float(res) / n_f_of_id
        return ans_value
