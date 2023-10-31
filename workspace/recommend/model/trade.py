from sqlalchemy import Column, Integer, String, BigInteger, BINARY, TIMESTAMP
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Trade(Base):
    __tablename__ = 'trade'
    trade_id = Column(BigInteger, primary_key=True)
    seller_id = Column(BINARY(16))
    category_id = Column(BigInteger)
    address_id = Column(Integer)
    title = Column(String(50))
    price = Column(Integer)
    explain = Column(String)
    count = Column(Integer)
    view_count = Column(Integer)
    trade_status = Column(Integer)
    created_date = Column(TIMESTAMP)
    update_date = Column(TIMESTAMP)