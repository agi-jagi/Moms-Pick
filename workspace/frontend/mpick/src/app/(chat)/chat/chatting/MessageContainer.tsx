"use client";

import React from "react";
// import "./MessageContainer.css";
import { Container } from "@mui/system";
import Image from "next/image";
import profile from "../../../../../public/profile.png";

const MessageContainer = (props: any) => {
  return (
    <div>
      {props.messageList.map((message: any, index: number) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === props.user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <Image
                  src={profile}
                  alt="profile"
                  width={500}
                  height={500}
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : props.messageList[index - 1].user.name === props.user.name) ||
                    props.messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
