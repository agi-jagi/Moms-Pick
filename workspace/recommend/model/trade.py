from sqlalchemy import Column, Integer, String, BigInteger, BINARY, TIMESTAMP
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Trade(Base):
    __tablename__ = 'trade'
    trade_id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger)
    category_id = Column(BigInteger)
    address_id = Column(Integer)
    title = Column(String(50))
    price = Column(Integer)
    trade_explain = Column(String)
    wish_count = Column(Integer)
    view_count = Column(Integer)
    trade_status = Column(Integer)
    created_date = Column(TIMESTAMP)
    update_date = Column(TIMESTAMP)
    thumb_nail_image = Column(String)
    buyer_id = Column(BigInteger)