from sqlalchemy import Column, Integer, String, BigInteger, BINARY, TIMESTAMP
from sqlalchemy.orm import declarative_base 

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    user_id = Column(BigInteger, primary_key=True)  
    login_id = Column(String(20))
    nickname = Column(String(20))
    password = Column(String(60))
    status = Column(String)
    profile_image = Column(String(255))
    email = Column(String(100))
    created_date = Column(TIMESTAMP)
    user_intro = Column(String(300))