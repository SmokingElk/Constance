import psycopg2
import configparser


config = configparser.ConfigParser()
config.read('for_bd.cfg', encoding='utf-8')
data_base_name = config.get('Settings_of_bd', 'dbname')
username_of_database = config.get('Settings_of_bd', 'user')
password_of_database = config.get('Settings_of_bd', 'password')
name_of_host = config.get('Settings_of_bd', 'host')
conn = psycopg2.connect(dbname=data_base_name, user=username_of_database,
                        password=password_of_database, host=name_of_host)
# первая таблица Autorisation
cursor = conn.cursor()
cursor.execute('''CREATE TABLE "Autorisation" ("id" INTEGER)''')
cursor.execute('ALTER TABLE "Autorisation" ADD COLUMN username CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "Autorisation" ADD COLUMN password CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "Autorisation" ADD COLUMN "Gender" BOOLEAN''')
cursor.execute('''ALTER TABLE "Autorisation" ADD COLUMN "Date of birth" DATE''')
cursor.execute('''ALTER TABLE "Autorisation" ADD COLUMN include_in_search BOOLEAN''')
conn.commit()
cursor.close()
# вторая таблица profile_data
cursor = conn.cursor()
cursor.execute('''CREATE TABLE "profile_data" ("id" INTEGER)''')
cursor.execute('''ALTER TABLE "profile_data" ADD COLUMN firstname CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "profile_data" ADD COLUMN lastname CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "profile_data" ADD COLUMN social CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "profile_data" ADD COLUMN phone_number CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "profile_data" ADD COLUMN photo_name CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "profile_data" ADD COLUMN about_me CHARACTER VARYING''')
cursor.execute('''ALTER TABLE "profile_data" ADD COLUMN location CHARACTER VARYING''')
conn.commit()
cursor.close()

# третья таблица characteristics
cursor = conn.cursor()
cursor.execute('CREATE TABLE "characteristics" ("id" INTEGER)')
for i in range(0, 84):
    cursor = conn.cursor()
    k = 'id_' + str(i)
    cursor.execute('''ALTER TABLE "characteristics" ADD COLUMN "%s" text''', (k, ))
conn.commit()
cursor.close()


# четвёртая таблица preferences
cursor = conn.cursor()
cursor.execute('CREATE TABLE "preferences" ("id" INTEGER)')
for i in range(0, 84):
    cursor = conn.cursor()
    k = 'id_' + str(i)
    cursor.execute('''ALTER TABLE "preferences" ADD COLUMN "%s" text''', (k, ))
conn.commit()
cursor.close()
