from pydantic import BaseModel
from typing import Optional

class RecommendResponse(BaseModel):
    trade_id: int
    seller_name: int
    title: str
    price: int
    save_file_name: str

def serialize_recommend_response(trade, user, trade_image):
    return RecommendResponse(
        trade_id = trade.trade_id,
        seller_name = user.nickname,
        title = trade.title,
        price = trade.price,
        save_file_name = trade_image.save_file_name
    ).__dict__