import os
import oracledb


DB_USER = os.getenv("DB_USER", "ADMIN")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_DSN = os.getenv("DB_DSN")  # Cadena de conexión o nombre del servicio


def get_db_connection():

    return oracledb.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        dsn=DB_DSN
    )
