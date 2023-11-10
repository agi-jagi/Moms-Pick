from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from decouple import config

# db_info = {
#     "user": config('SQL_USER'),
#     "password": config('SQL_PASSWORD'),
#     "host": config('DB_HOST'),
#     "port": config('DB_PORT'),
#     "database": config('DB_NAME')
# }

db_info = {
    "user": "root",
    "password": "ssafy_mpick_c202",
    "host": "k9c202.p.ssafy.io",
    "port": 3306,
    "database": "mpick"
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