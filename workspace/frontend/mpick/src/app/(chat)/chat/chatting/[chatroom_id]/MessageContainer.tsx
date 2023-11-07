"use client";

import React from "react";
// import "./MessageContainer.css";
import { Container } from "@mui/system";
import Image from "next/image";
import profile from "../../../../../../public/profile.png";

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
            ) : message.user.name === props.user ? (
              <div
                className="my-message-container"
                style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
              >
                <div
                  className="my-message"
                  style={{
                    backgroundColor: "#a0d3e9",
                    padding: "8px",
                    maxWidth: "200px",
                    borderRadius: "8px",
                  }}
                >
                  {message.chat}
                </div>
              </div>
            ) : (
              <div
                className="your-message-container"
                style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}
              >
                <div
                  style={{
                    borderRadius: "100px",
                    overflow: "hidden",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <Image
                    src={profile}
                    alt="profile"
                    objectFit="cover"
                    style={
                      (index === 0
                        ? { visibility: "visible" }
                        : props.messageList[index - 1].user.name === props.user) ||
                      props.messageList[index - 1].user.name === "system"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                </div>
                <div
                  className="your-message"
                  style={{
                    backgroundColor: "rgb(247, 247, 247)",
                    padding: "8px",
                    maxWidth: "200px",
                    borderRadius: "8px",
                    marginLeft: "5px",
                  }}
                >
                  {message.chat}
                </div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
