import psycopg2
import configparser
import json
from analyzer import Analyzer
from getter_of_rates import GetterOfRates
import time
PACK_SIZE = 2
GETTER = GetterOfRates()
ANALYZER = Analyzer()


class DatabaseManager:
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

    def checking_for_authorized_user(self, username: str, password: str) -> int:
        cursor = self.conn.cursor()
        cursor.execute('''SELECT id FROM "Autorisation" WHERE username=%s AND password=%s ''',
                       (username, password))
        records = cursor.fetchall()
        cursor.close()
        if len(records) == 0:
            return -1
        return records[0][0]

    def counting_users(self) -> int:
        cursor = self.conn.cursor()
        cursor.execute('''SELECT COUNT(1) FROM "Autorisation"''')
        records = cursor.fetchall()
        cursor.close()
        return records[0][0]

    def get_primary_data(self, user_id: int):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT username, "Gender", "Date of birth" FROM "Autorisation" WHERE id=%s''', (user_id, ))
        records = cursor.fetchall()
        cursor.close()
        if len(records) == 0:
            return -1
        return records[0]

    def is_user_exists(self, username: str):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT id FROM "Autorisation" WHERE username=%s''', (username, ))
        records = cursor.fetchall()
        cursor.close()
        return len(records) != 0

    def adding_user(self, username: str, password: str, gender: bool, birthday: str) -> int:
        cursor = self.conn.cursor()
        user_id = self.counting_users() + 1
        cursor.execute('''INSERT INTO "Autorisation" (id, username, password, "Gender", "Date of birth")\
                                VALUES (%s, %s, %s, %s, %s)''',
                       (user_id, username, password, gender, birthday))
        cursor.execute('''INSERT INTO "profile_data" (id, firstname, lastname, social, phone_number, photo_name, include_in_search)\
                                VALUES (%s, %s, %s, %s, %s, %s, %s)''',
                       (user_id, '', '', '', '', '', True))
        self.conn.commit()
        cursor.close()
        GETTER.getter_of_last_update_in_tables(time.time())
        return user_id

    def get_my_profile_data(self, user_id: int):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT firstname, lastname, social, phone_number, photo_name, about_me, location, include_in_search \
                                 FROM "profile_data" WHERE id=%s''', (user_id,))
        records = cursor.fetchall()
        cursor.close()
        if len(records) == 0:
            return -1
        return records[0]

    def patch_user_profile_data(self, user_id: int, key: str, value):
        cursor = self.conn.cursor()
        cursor.execute(f'''UPDATE "profile_data" SET {key}=%s WHERE id=%s''', (value, user_id))
        self.conn.commit()
        cursor.close()
        GETTER.getter_of_last_update_in_tables(time.time())

    def is_user_exists_by_id(self, user_id: int) -> bool:
        cursor = self.conn.cursor()
        cursor.execute('''SELECT * FROM "Autorisation" WHERE id=%s''', (user_id, ))
        records = cursor.fetchall()
        cursor.close()
        return len(records) != 0

    def getting_birthdate(self, user_id: int):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT "Date of birth" FROM "Autorisation" WHERE id=%s''', (user_id, ))
        records = cursor.fetchall()
        cursor.close()
        if len(records) == 0:
            return -1
        return records[0][0]

    def set_chars(self, user_id: int, id_of_ch: int, patch: dict):
        cursor = self.conn.cursor()
        cursor.execute('SELECT exists (select true from "characteristics" where id=%s)', (user_id,))
        records = cursor.fetchall()
        id_of_char = 'id_' + str(id_of_ch)
        if not records[0][0]:
            cursor.execute('''INSERT INTO "characteristics" (id) VALUES (%s)''', (user_id, ))
            for i in range(0, 84):
                cursor = self.conn.cursor()
                k = 'id_' + str(i)
                to_bd = {
                    '''charType''': ANALYZER.get_datatype(i),
                    '''id''': i,
                    '''value''': ANALYZER.get_default(i)
                }
                cursor.execute('''UPDATE "characteristics" SET "%s"=%s WHERE id=%s''',
                               (k, json.dumps(to_bd, ensure_ascii=False,), user_id))

        to_bd = {
            "charType": ANALYZER.get_datatype(id_of_ch),
            "id": id_of_ch,
            "value": patch['value']
        }
        cursor.execute('''UPDATE "characteristics" SET "%s"=%s WHERE id=%s''',
                       (id_of_char, json.dumps(to_bd, ensure_ascii=False,), user_id))
        self.conn.commit()
        cursor.close()
        GETTER.getter_of_last_update_in_tables(time.time())

    def getting_all_chars(self, user_id: int) -> list:
        cursor = self.conn.cursor()
        data_for_return = []
        cursor.execute('''SELECT * FROM "characteristics" WHERE id=%s''', (user_id,))
        records = cursor.fetchall()
        data = list(records[0])[1:]
        for i in data:
            new = json.loads(i)
            new["group"] = ANALYZER.get_group(int(new["id"]))
            data_for_return.append(new)
        return data_for_return

    def getting_all_prefs(self, user_id: int) -> list:
        cursor = self.conn.cursor()
        data_for_return = []
        cursor.execute('''SELECT * FROM "preferences" WHERE id=%s''', (user_id,))
        records = cursor.fetchall()
        data = list(records[0])[1:]
        for i in data:
            new = json.loads(i)
            new["group"] = ANALYZER.get_group(new["id"])
            data_for_return.append(new)
        return data_for_return

    def set_prefs(self, user_id: int, id_of_ch: int, patch: dict):
        cursor = self.conn.cursor()
        cursor.execute('SELECT exists (select true from "preferences" where id=%s)', (user_id,))
        records = cursor.fetchall()
        if not records[0][0]:
            cursor.execute('''INSERT INTO "preferences" (id) VALUES (%s)''', (user_id,))
            for i in range(0, 84):
                cursor = self.conn.cursor()
                t = ANALYZER.get_datatype(i)
                to_bd = {}
                if t == 'binary':
                    to_bd = {'prefType': t,
                             'id': i,
                             'positiveScale': 1.0,
                             'negativeScale': 1.0,
                             'otherNegative': False
                             }
                elif t == 'discrete':
                    to_bd = {'prefType': t,
                             'id': i,
                             'positiveScale': 1.0,
                             'negativeScale': 1.0,
                             'otherNegative': False,
                             'columnsCoefs': ANALYZER.get_data(i, 'columnsCoefs')
                             }
                elif t == 'continuous':
                    to_bd = {'prefType': t,
                             'id': i,
                             'positiveScale': 1.0,
                             'negativeScale': 1.0,
                             'otherNegative': False,
                             'spreadPoints': ANALYZER.get_data(i, 'spreadPoints')
                             }
                k = f'id_{i}'
                cursor.execute('''UPDATE "preferences" SET "%s"=%s WHERE id=%s''',
                               (k, json.dumps(to_bd, ensure_ascii=False, ), user_id))

        cursor.execute('''SELECT "'id_''' + str(id_of_ch) + ''''" FROM "preferences" WHERE id=%s''', (user_id,))
        records = cursor.fetchall()
        to_bd = json.loads(records[0][0])
        for key in ["positiveScale", "negativeScale", "otherNegative"]:
            if key in patch:
                to_bd[key] = patch[key]
        t = ANALYZER.get_datatype(id_of_ch)
        if t == "continuous" and "points" in patch:
            for i in patch["points"]:
                to_bd["spreadPoints"][i["x"]] = i["y"]
        elif t == "discrete" and "columnsCoefs" in patch:
            for i in patch["columnsCoefs"]:
                to_bd["columnsCoefs"][i["columnNumber"]] = i["coef"]
        cursor.execute('''UPDATE "preferences" SET "%s"=%s WHERE id=%s''',
                       (f'id_{id_of_ch}', json.dumps(to_bd, ensure_ascii=False, ), user_id))
        self.conn.commit()
        cursor.close()
        GETTER.getter_of_last_update_in_tables(time.time())

    def get_search_data(self, user_id: int, pack_number: int) -> dict:
        cursor = self.conn.cursor()
        data_for_return = []
        cursor.execute('''SELECT * FROM "preferences" WHERE id=%s''', (user_id,))
        records = cursor.fetchall()
        records = list(records[0][1:])
        rates = GETTER.get_rates(records, user_id)
        pack = []
        for i in rates:
            user = self.get_my_profile_data(i['id'])
            to_return = {
                'firstname': user[0],
                "about_me": user[5],
                "photo": user[4],
                "rate": i['rate'],
                "id": i['id'],
                'location': user[6]
            }
            pack.append(to_return)
        if pack_number * PACK_SIZE >= len(pack):
            return {"is_end": True,
                    "pack_items": []}
        else:
            ost = len(pack) - pack_number * PACK_SIZE
            for i in range(0, min(ost, PACK_SIZE)):
                new_i = i + PACK_SIZE * pack_number
                data_for_return.append(pack[new_i])
        ans = {
            "is_end": ost <= PACK_SIZE,
            "pack_items": data_for_return
        }
        return ans

    def deletter_of_data_for_tests(self):
        cursor = self.conn.cursor()
        cursor.execute('''DELETE FROM "preferences"''')
        self.conn.commit()
        cursor.execute('''DELETE FROM "characteristics"''')
        self.conn.commit()
        cursor.execute('''DELETE FROM "Autorisation"''')
        self.conn.commit()
        cursor.execute('''DELETE FROM "profile_data"''')
        self.conn.commit()
        cursor.close()