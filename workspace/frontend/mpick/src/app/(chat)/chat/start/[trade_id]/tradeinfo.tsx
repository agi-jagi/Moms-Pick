"use client";

import { useState, useEffect } from "react";
import instance from "@/app/_config/axios";
import { Image, Button } from "@nextui-org/react";
import { useNickNameSet } from "@/store/ChattingStore";

export default function TradeInfo(props: any) {
  const [tradeImage, setTradeImage] = useState<string>("");
  const [tradeData, setTradeData] = useState<any>({});
  const [tradeStatus, setTradeStatus] = useState<string>("");
  const { userNickName } = useNickNameSet();

  const saleComplete = () => {
    instance
      .put(`/api/trades/item`, { chatRoomId: props.chatroom_id })
      .then((res) => {
        if (typeof props.setOpenRating != "undefined") {
          props.setOpenRating(true);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [props.sellerNickName]);

  useEffect(() => {
    instance
      .get(`/api/trades/item/${props.trade_id}`)
      .then((res) => {
        setTradeData(res.data.response);
        setTradeStatus(res.data.response.tradeStatus);
        props.setSellerNickName(res.data.response.nickname);
        setTradeImage(res.data.response.tradeImages[0]);
      })
      .catch((err) => {});
  }, [props.trade_id]);

  return (
    <div>
      <div style={{ margin: "10px", display: "flex" }}>
        <Image alt="detail Item Image" src={tradeImage} width={70} />
        <div
          style={{
            marginLeft: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p>{tradeData.title}</p>
            <p className="font-bold">{tradeData.price}원</p>
          </div>
          <div>
            {props.userNickName === props.sellerNickName ? (
              tradeData.tradeStatus === "판매완료" ? (
                <p>{tradeStatus}</p>
              ) : (
                <Button
                  onClick={() => {
                    saleComplete();
                    props.onOpen();
                  }}
                  style={{ backgroundColor: "#5E9FF2" }}
                >
                  <p className="text-white">판매완료</p>
                </Button>
              )
            ) : (
              <p
                onClick={() => {
                  props.onOpen();
                }}
              >
                {tradeStatus}
              </p>
            )}
          </div>
        </div>
      </div>
      <hr style={{ borderTopWidth: "2px", margin: "10px 0" }} />
    </div>
  );
}
