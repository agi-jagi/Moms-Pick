"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import GoBack from "../../../../(auth)/auth/GoBack";
import instance from "@/app/_config/axios";
import { Container } from "@mui/system";
import Image from "next/image";
import profile from "../../../../../../public/profile.png";
import { useChattingStore, useOpponent } from "@/store/ChattingStore";
import TradeInfo from "../../start/[trade_id]/tradeinfo";
import { useUnReadStore } from "@/store/UnReadStore";

export default function Chatting(props: any) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const [tradeId, setTradeId] = useState<number>();

  const { messageStore, setMessageStore } = useChattingStore();
  const { nickName } = useOpponent();
  const { decrement } = useUnReadStore();

  const chattingReload = async (data: any) => {
    // setMessageList를 비동기적으로 호출
    await new Promise((resolve) => {
      setMessageList((prevMessageList: any) => {
        const updatedList = [...prevMessageList, JSON.parse(data)];
        console.log("Updated list:", updatedList);
        decrement(1);
        resolve(updatedList);
        return updatedList;
      });
    });

    // setMessageStore를 비동기적으로 호출
    await new Promise((resolve) => {
      setMessageStore(messageList);
    });

    // 이후 추가적인 작업 수행 가능
  };

  useEffect(() => {
    instance
      .get(`/api/chattings/${props.params.chatroom_id}`)
      .then((res) => {
        console.log(res);
        setMessageList(res.data.response);
        setTradeId(res.data.response[0].tradeId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messageList]);

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
            <p className="font-bold text-2xl">{nickName}</p>
          </div>
        </div>
        <hr style={{ borderTopWidth: "2px", margin: "10px 0" }} />
      </div>
      <TradeInfo trade_id={tradeId} chatroom_id={props.params.chatroom_id} />
      <div>
        <div>
          {messageList.map((message: any, index: number) => {
            return (
              <Container key={index} className="message-container">
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
                        width: "45px",
                        height: "45px",
                      }}
                    >
                      <Image src={profile} alt="profile" objectFit="cover" />
                    </div>
                    <div>
                      <div>
                        <p>{nickName}</p>
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
          messageList={messageList}
        />
      </div>
      <div style={{ height: "117px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
