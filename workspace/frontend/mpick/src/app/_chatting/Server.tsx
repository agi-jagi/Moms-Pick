"use client";

import { useEffect } from "react";
import instance from "../_config/axios";
import { useUnReadStore } from "@/store/UnReadStore";
import { useConnecting } from "@/store/WebSocket";

const Server = () => {
  let socket: any;
  const { count, increment } = useUnReadStore();
  const { isConnect } = useConnecting();

  const connect = () => {
    let unReadCountDummy: number = count;
    instance
      .get(`/api/chattings`)
      .then((res) => {
        res.data.response.forEach((element: any) => {
          const unReadData = element.unreadCount;
          unReadCountDummy += unReadData;
        });
        increment(unReadCountDummy);
      })
      .catch((err) => {});

    const jwt = localStorage.getItem("accessToken");
    // socket = new WebSocket("ws://localhost:5000/ws?jwt=" + jwt);
    socket = new WebSocket(process.env.MPICK_WEBSOCKET_URL  + "/ws?jwt=" + jwt);
    socket.onopen = (e: any) => {
      console.log("connected");
    };
    socket.onmessage = (e: any) => {
      console.log("message");
      increment(1);
    };
  };

  useEffect(() => {
    if (isConnect) {
      connect();
    }
  }, [isConnect]);

  return <></>;
};

export default Server;
