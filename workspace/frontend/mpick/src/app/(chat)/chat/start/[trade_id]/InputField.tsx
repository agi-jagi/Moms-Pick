"use client";

import { useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

let socket: any;
const InputField = (props: any) => {
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("accessToken");
    // socket = new WebSocket("ws://localhost:5000/ws?jwt=" + jwt);
    socket = new WebSocket("wss://k9c202.p.ssafy.io/ws?jwt=" + jwt);

    socket.onopen = (e: any) => {
      console.log("connected");
    };

    if (!socket.onmessage) {
      socket.onmessage = async (e: any) => {
        router.push(`/chat/chatting/${JSON.parse(e.data).chatRoomId}`);
      };
    }

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div
      className="input-area"
      style={{ display: "flex", position: "fixed", bottom: "80px", width: "100%", zIndex: "1" }}
    >
      <div
        className="plus-button"
        style={{ display: "flex", justifyContent: "center", width: "50px", fontSize: "24px" }}
      >
        +
      </div>
      <div
        className="input-container"
        style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Input
          placeholder="메시지를 입력해주세요"
          value={props.message}
          onChange={(event) => props.setMessage(event.target.value)}
          style={{ width: "100%", height: "100%" }}
        />
        <Button
          onClick={() => {
            props.setMessage("");
            const data = {
              tradeId: props.tradeId,
              message: props.message,
            };
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify(data));
            }
          }}
          disabled={props.message === ""}
          className="send-button"
          style={{ minWidth: "70px" }}
        >
          전송
        </Button>
      </div>
    </div>
  );
};

export default InputField;
