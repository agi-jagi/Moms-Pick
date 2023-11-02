from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy import desc, asc, func
from fastapi.responses import JSONResponse

from db.connection import engineconnection

from model.trade import Trade
from model.user import User
from model.trade_image import TradeImage

from schema.RecommendRequest import RecommendRequest
from schema.RecommendResponse import RecommendResponse, serialize_recommend_response

from typing import List

engine = engineconnection()
session = engine.sessionmaker()

router = APIRouter(
    prefix="/recommend"
)

@router.post("", response_model = List[RecommendResponse])
async def get_recommend_list(RecommendRequest: RecommendRequest):

    dummy_result = []

    for i in range(1, 11):
    
        dummy_result.append(
            {
                'trade_id' : i,
                'nickname' : '네즈코' + str(i),
                'title' : '벽력일섬' + str(i),
                'price' : 100000,
                'save_file_name' : 'https://data.onnada.com/character/202105/3731841375_83bd7463_1.PNG'
            }
        )

    try:
    #     result = session.query(Trade).limit(9).all()
        
    #     for i in range(len(result)):
    #         user = session.query(User).filter(User.user_id == result[i].seller_id).first()
    #         trade_image = session.query(TradeImage).filter(TradeImage.trade_id == result[i].trade_id).first()
    #         result[i] = serialize_recommend_response(result[i], user, trade_image)

        response = JSONResponse(content=dummy_result, status_code=200)

        return response
    except Exception as e:
        return JSONResponse(content={"error" : "Bad Request", "message" : f"{e}"}, status_code=400)

    finally:
        session.close()


