from sqlalchemy import Column, Integer, String, BigInteger, BINARY, TIMESTAMP
from sqlalchemy.orm import declarative_base 

Base = declarative_base()

class Wish(Base):
    __tablename__ = 'wish'
    wish_id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger)
    trade_id = Column(BigInteger)
    wish_create_date = Column(TIMESTAMP)