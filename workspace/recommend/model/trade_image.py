from sqlalchemy import Column, Integer, String, BigInteger, BINARY, TIMESTAMP
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class TradeImage(Base):
    __tablename__ = 'trade_image'
    trade_image_id = Column(BigInteger, primary_key=True)
    trade_id = Column(BigInteger)
    upload_file_name = Column(String(255))
    saved_file_name = Column(String(255))
    created_date = Column(TIMESTAMP)
    update_date = Column(TIMESTAMP)
    sequence = Column(Integer)