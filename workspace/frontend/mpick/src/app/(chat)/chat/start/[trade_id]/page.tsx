"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import GoBack from "../../../../(auth)/auth/GoBack";
import TradeInfo from "./tradeinfo";
import { useSellerNickNameSet } from "@/store/ChattingStore";

export default function Chatting(props: any) {
  const [message, setMessage] = useState("");
  const { sellerNickName } = useSellerNickNameSet();

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            padding: "20px 30px 0 30px",
          }}
        >
          <GoBack />
          <div className="flex justify-center">
            <p className="font-bold text-2xl">{sellerNickName}</p>
          </div>
        </div>
        <hr style={{ borderTopWidth: "2px", margin: "10px 0" }} />
      </div>
      <TradeInfo trade_id={props.params.trade_id} />
      <div>
        <InputField message={message} setMessage={setMessage} tradeId={props.params.trade_id} />
      </div>
      <div style={{ height: "117px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
