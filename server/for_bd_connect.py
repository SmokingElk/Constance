import psycopg2
import configparser

class Database_manager:
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

    def checking_for_authorized_user(self, username: str, password: str):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT id FROM "Autorisation" WHERE username=%s AND password=%s ''', (username, password))
        records = cursor.fetchall()
        cursor.close()
        if len(records) == 0:
            return -1
        return records[0][0]

    def counting_users(self):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT COUNT(1) FROM "Autorisation"''')
        records = cursor.fetchall()
        cursor.close()
        return records[0][0]

    def get_username_by_id(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT username FROM "Autorisation" WHERE id=%s''', (user_id, ))
        records = cursor.fetchall()
        cursor.close()
        if len(records) == 0:
            return -1
        return records[0][0]

    def is_user_exists(self, username: str):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT id FROM "Autorisation" WHERE username=%s''', (username, ))
        records = cursor.fetchall()
        cursor.close()
        return len(records) != 0

    def adding_user(self, username: str, password: str, gender: bool, birthday: str):
        cursor = self.conn.cursor()
        user_id = self.counting_users() + 1
        cursor.execute('''INSERT INTO "Autorisation" (id, username, password, "Gender", "Date of birth") VALUES (%s, %s, %s, %s, %s)''', (user_id, username, password, gender, birthday))
        cursor.execute('''INSERT INTO "profile_data" (id, firstname, lastname, social, phone_number, photo_name) VALUES (%s, %s, %s, %s, %s, %s)''', (user_id, '', '', '', '', ''))
        self.conn.commit()
        cursor.close()
        return user_id

    def get_my_profile_data(self, user_id: int):
        cursor = self.conn.cursor()
        cursor.execute('''SELECT firstname, lastname, social, phone_number, photo_name FROM "profile_data" WHERE id=%s''', (user_id,))
        records = cursor.fetchall()
        cursor.close()
        if len(records) == 0:
            return -1
        return records[0]

    def patch_user_profile_data(self, user_id: int, key: str, value: str):
        cursor = self.conn.cursor()
        cursor.execute(f'''UPDATE "profile_data" SET {key}=%s WHERE id=%s''', (value, user_id))
        self.conn.commit()
        cursor.close()

    def is_user_exists_by_id(self, user_id: int):
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



