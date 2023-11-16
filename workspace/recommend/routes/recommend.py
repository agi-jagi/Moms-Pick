from fastapi import APIRouter, Depends, Query, Header
from fastapi.responses import JSONResponse
from sqlalchemy import desc, asc, func
from fastapi.responses import JSONResponse

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

from db.connection import engineconnection

from model.trade import Trade
from model.user import User
from model.wish import Wish

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

    try:
        wishes = session.query(Wish).filter(Wish.user_id == RecommendRequest.user_id).all()

        wishTradeIds = []


        if len(wishes) != 0:


            for wish in wishes:
                wishTradeIds.append(wish.trade_id)
            
            result = session.query(Trade).filter(
                (Trade.user_id != RecommendRequest.user_id) &
                (Trade.trade_id not in wishTradeIds) & 
                (Trade.buyer_id is None) &
                Trade.trade_status == '판매중'
                ).order_by(
                (Trade.view_count + Trade.wish_count).desc()
            ).all()
        else:
            result = session.query(Trade).filter(
                (Trade.user_id != RecommendRequest.user_id) & 
                (Trade.buyer_id == None) &
                (Trade.trade_status == '판매중')
                ).order_by(
                (Trade.view_count + Trade.wish_count).desc()
            ).all()

        if len(result) < 10:
            result = session.query(Trade).all()

        for i in range(len(result)):
            user = session.query(User).filter(User.user_id == result[i].user_id).first()
            result[i] = serialize_recommend_response(result[i], user)
        response = JSONResponse(content=result[:10], status_code=200)

        return response
    except Exception as e:
        return JSONResponse(content={"error" : "Bad Request", "message" : f"{e}"}, status_code=400)

    finally:
        session.close()