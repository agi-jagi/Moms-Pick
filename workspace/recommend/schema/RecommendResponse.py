from pydantic import BaseModel
from typing import Optional

class RecommendResponse(BaseModel):
    trade_id: int
    nickname: str
    title: str
    price: int
    save_file_name: str

def serialize_recommend_response(trade, user):
    return RecommendResponse(
        trade_id = trade.trade_id,
        nickname = user.nickname,
        title = trade.title,
        price = trade.price,
        save_file_name = trade.thumb_nail_image
    ).__dict__