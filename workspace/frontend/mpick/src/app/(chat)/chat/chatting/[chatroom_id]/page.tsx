"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import GoBack from "../../../../(auth)/auth/GoBack";
import instance from "@/app/_config/axios";
import { Container } from "@mui/system";
import Image from "next/image";
import profile from "../../../../../../public/profile.png";

export default function Chatting(props: any) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const chattingReload = () => {
    instance
      .get(`/api/chattings/${props.params.chatroom_id}`)
      .then((res) => {
        console.log(res);
        setMessageList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    instance
      .get(`/api/chattings/${props.params.chatroom_id}`)
      .then((res) => {
        console.log(res);
        setMessageList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // return (
  //   <div>
  //     <div
  //       style={{
  //         margin: "20px 30px",
  //       }}
  //     >
  //       <GoBack />
  //       <div className="flex justify-center">
  //         <p className="font-bold text-3xl">채팅</p>
  //       </div>
  //       <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
  //     </div>
  //     <div>
  //       <MessageContainer messageList={messageList} user={user} />
  //       <InputField message={message} setMessage={setMessage} />
  //     </div>
  //   </div>
  // );

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
        <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
      </div>
      <div>
        <div>
          {messageList.map((message: any, index: number) => {
            return (
              <Container key={message.chatMessageId} className="message-container">
                {message.toMe === false ? (
                  <div
                    className="my-message-container"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
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
                      {message.message}
                    </div>
                  </div>
                ) : (
                  <div
                    className="your-message-container"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "100px",
                        overflow: "hidden",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <Image src={profile} alt="profile" objectFit="cover" />
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
                      {message.message}
                    </div>
                  </div>
                )}
              </Container>
            );
          })}
        </div>
        <InputField
          message={message}
          setMessage={setMessage}
          chatRoomId={props.params.chatroom_id}
          chattingReload={chattingReload}
        />
      </div>
    </div>
  );
}
