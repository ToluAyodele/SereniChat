import mysql.connector

from core.config import settings

db_config = {
    'user': settings.MYSQL_USER,
    'password': settings.MYSQL_PASSWORD,
    'host': settings.MYSQL_SERVER,
    'database': settings.MYSQL_DB,
    'raise_on_warnings': True
}

mysql_cnx = mysql.connector.connect(**db_config)
