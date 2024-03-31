import psycopg2
import configparser

def checking_for_authorized_user(username: str, password: str):
    config = configparser.ConfigParser()
    config.read('for_bd.cfg')
    data_base_name = config.get('Settings_of_bd', 'dbname')
    username_of_database = config.get('Settings_of_bd', 'user')
    password_of_database = config.get('Settings_of_bd', 'password')
    name_of_host = config.get('Settings_of_bd', 'host')
    conn = psycopg2.connect(dbname=data_base_name, user=username_of_database,
                            password=password_of_database, host=name_of_host)
    cursor = conn.cursor()
    cursor.execute('''SELECT id FROM "Autorisation" WHERE username=%s AND password=%s ''', (username, password))
    records = cursor.fetchall()
    cursor.close()
    conn.close()
    if len(records) == 0:
        return -1
    else:
        return records[0][0]

