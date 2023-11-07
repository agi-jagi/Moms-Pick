"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import MessageContainer from "./MessageContainer";
import GoBack from "../../../../(auth)/auth/GoBack";
import socket from "./Server";
import instance from "@/app/_config/axios";

export default function Chatting(props: any) {
  const [user, setUser] = useState("asdf");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([
    {
      _id: 0,
      user: {
        name: "asdf",
      },
      chat: "asdf 1",
    },
    {
      _id: 1,
      user: {
        name: "qwer",
      },
      chat: "qwer 1",
    },
  ]);

  useEffect(() => {
    console.log("web", socket);
    socket.on("connect", () => {
      console.log("res", socket);
    });

    instance
      .get(`/api/chattings/${props.params.chatroom_id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          margin: "20px 30px",
        }}
      >
        <GoBack />
        <div className="flex justify-center">
          <p className="font-bold text-3xl">채팅</p>
        </div>
        <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
      </div>
      <div>
        <MessageContainer messageList={messageList} user={user} />
        <InputField message={message} setMessage={setMessage} />
      </div>
    </div>
  );
}
