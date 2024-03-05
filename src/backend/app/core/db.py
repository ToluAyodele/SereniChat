import mysql.connector
from mysql.connector import errorcode
from config import settings

db_config = {
    'user': settings.MYSQL_USER,
    'password': settings.MYSQL_PASSWORD,
    'host': settings.MYSQL_SERVER,
    'database': settings.MYSQL_DB,
    'raise_on_warnings': True
}

try:
    cnx = mysql.connector.connect(**db_config)

    if cnx and cnx.is_connected():
        with cnx.cursor() as cursor:
            result = cursor.execute('SELECT * FROM orgs LIMIT 25')
            rows = cursor.fetchall()

            for r in rows:
                print(r)
        cnx.close()

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)

# TODO: Probably can just return the cursor from this file and use it in the routes
        # since the routes basically contain the endpoints
         