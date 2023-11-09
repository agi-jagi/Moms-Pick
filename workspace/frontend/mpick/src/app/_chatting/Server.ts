"use client";

import Connect from "./Connect";
import instance from "../_config/axios";

let socket: any;
socket = Connect(socket);
instance
  .get(`/api/chattings`)
  .then((res) => {
    console.log("chattingList", res);
    res.data.response.forEach((element: any) => {
      getChatting(element.chatRoomId);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const getChatting = (chatRoomId: number) => {
  instance
    .get(`/api/chattings/${chatRoomId}`)
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default socket;
