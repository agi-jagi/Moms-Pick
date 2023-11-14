"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import GoBack from "../../../../(auth)/auth/GoBack";
import instance from "@/app/_config/axios";
import { Container } from "@mui/system";
import Image from "next/image";
import profile from "../../../../../../public/profile.png";
import { useChattingStore } from "@/store/ChattingStore";
import TradeInfo from "./tradeinfo";

export default function Chatting(props: any) {
  const [message, setMessage] = useState("");

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
            <p className="font-bold text-3xl">채팅</p>
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
