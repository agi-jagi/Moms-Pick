"use client";

import { useState, useEffect } from "react";
import instance from "@/app/_config/axios";
import { Image } from "@nextui-org/react";

export default function TradeInfo(props: any) {
  const [tradeImage, setTradeImage] = useState<string>("");
  const [tradeTitle, setTradeTitle] = useState<string>("");
  const [tradeNickName, setTradeNickName] = useState<string>("");

  useEffect(() => {
    instance
      .get(`/api/trades/item/${props.trade_id}`)
      .then((res) => {
        const tradeData = res.data.response;
        console.log(tradeData);
        setTradeImage(tradeData.tradeImages[0]);
        setTradeTitle(tradeData.title);
        setTradeNickName(tradeData.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <p>{tradeTitle}</p>
          <p>{tradeNickName}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}
