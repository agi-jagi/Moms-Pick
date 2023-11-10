"use client";

import { useEffect } from "react";
import instance from "../_config/axios";
import { useChattingStore } from "@/store/ChattingStore";
import { useUnReadStore } from "@/store/UnReadStore";

const Server = () => {
  let socket: any;
  const { unReadCountList, setUnReadCountList } = useUnReadStore();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const jwt = localStorage.getItem("accessToken");
      // socket = new WebSocket("ws://localhost:5000/ws?jwt=" + jwt);
      socket = new WebSocket("wss://k9c202.p.ssafy.io/ws?jwt=" + jwt);
      console.log("socket", socket);
      socket.onopen = (e: any) => {
        console.log("connected", e);
      };
      socket.onmessage = (e: any) => {
        console.log("message", e.data.message);
      };
    } else {
      return;
    }

    instance
      .get(`/api/chattings`)
      .then((res) => {
        console.log("chattingList", res);
        res.data.response.forEach((element: any) => {
          const unReadData = { chatRoomId: element.chatRoomId, unReadCount: element.unreadCount };
          const dummy = [...unReadCountList, unReadData];
          setUnReadCountList(dummy);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("unread", unReadCountList);
  }, [unReadCountList]);

  return <></>;
};

export default Server;
