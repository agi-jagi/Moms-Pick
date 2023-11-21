from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from decouple import config
from starlette.config import Config

# db_info = {
#     "user": config('SQL_USER'),
#     "password": config('SQL_PASSWORD'),
#     "host": config('DB_HOST'),
#     "port": config('DB_PORT'),
#     "database": config('DB_NAME')
# }

config = Config(".env")
SQL_USER = config('SQL_USER')
SQL_PASSWORD = config('SQL_PASSWORD')
DB_HOST = config('DB_HOST')
DB_PORT = config('DB_PORT')
DB_NAME = config('DB_NAME')

db_info = {
    "user": SQL_USER,
    "password": SQL_PASSWORD,
    "host": DB_HOST,
    "port": DB_PORT,
    "database": DB_NAME
}

conn_string = f'mysql+pymysql://{db_info["user"]}:{db_info["password"]}@{db_info["host"]}:{db_info["port"]}/{db_info["database"]}'

class engineconnection:

    def __init__(self):
        self.engine = create_engine(conn_string, pool_recycle=500)

    def sessionmaker(self):
        Session = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn