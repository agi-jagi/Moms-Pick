"use client";

import { useState, useEffect } from "react";
import instance from "@/app/_config/axios";
import { Image } from "@nextui-org/react";
import { useOpponent } from "@/store/ChattingStore";

export default function TradeInfo(props: any) {
  const [tradeImage, setTradeImage] = useState<string>("");
  const [tradeData, setTradeData] = useState<any>({})
  const { setNickName } = useOpponent()
  
  useEffect(() => {
    instance
      .get(`/api/trades/item/${props.trade_id}`)
      .then((res) => {
        console.log(res.data.response);
        setTradeData(res.data.response)
        setNickName(res.data.response.nickname);

        setTradeImage(res.data.response.tradeImages[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.trade_id]);

  return (
    <div>
      <div style={{ margin: "10px", display: "flex" }}>
        <Image
          alt="detail Item Image"
          className="object-cover rounded-xl"
          src={tradeImage}
          width={100}
        />
        <div>
          <p>{tradeData.title}</p>
          <p>{tradeData.tradeBabyMonth}</p>
          <p>{tradeData.subCategory}</p>
          <p>{tradeData.price}원</p>
          <p>{tradeData.tradeStatus}</p>
        </div>
      </div>
      <hr style={{ borderTopWidth: "2px", margin: "10px 0" }}/>
    </div>
  );
}
