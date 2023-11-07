"use client";

import { useState } from "react";
import InputField from "./InputField";
import MessageContainer from "./MessageContainer";

export default function Chatting() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  return (
    <div>
      <div>
        <MessageContainer messageList={messageList} user={user} />
        <InputField message={message} setMessage={setMessage} />
      </div>
    </div>
  );
}
