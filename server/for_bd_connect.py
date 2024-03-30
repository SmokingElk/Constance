import psycopg2


def checking_for_authorized_user(username, password):
    conn = psycopg2.connect(dbname='for_autorisation', user='Admin',
                            password='1234', host='localhost')
    cursor = conn.cursor()
    cursor.execute('''SELECT id FROM "Autorisation" WHERE username=%s AND password=%s ''', (username, password))
    records = cursor.fetchall()
    cursor.close()
    conn.close()
    if len(records) == 0:
        return -1
    else:
        return records[0][0]

