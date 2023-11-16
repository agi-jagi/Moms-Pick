"use client";

import { useState, useEffect } from "react";
import InputField from "./InputField";
import GoBack from "../../../../(auth)/auth/GoBack";
import instance from "@/app/_config/axios";
import { Container } from "@mui/system";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Avatar from "@mui/material/Avatar";
import profile from "../../../../../../public/profile.png";
import { useChattingStore, useOpponent } from "@/store/ChattingStore";
import TradeInfo from "../../start/[trade_id]/tradeinfo";
import { useUnReadStore } from "@/store/UnReadStore";
import { useDisclosure } from "@nextui-org/react";
import Rating from "./Rating";

export default function Chatting(props: any) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  const [tradeId, setTradeId] = useState<number>();
  const [sellerNickName, setSellerNickName] = useState<string>("");
  const [userNickName, setUserNickName] = useState<string>("");
  const [isSaleDone, setIsSaleDone] = useState<boolean>(false);
  const [isSellerRatingDone, setIsSellerRatingDone] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    instance
      .get("/api/users")
      .then((res) => {
        setUserNickName(res.data.response.nickname);
        console.log(res.data.response);
      })
      .catch((err) => {});
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
            <p className="font-bold text-2xl">{sellerNickName}</p>
          </div>
        </div>
        <hr style={{ borderTopWidth: "2px", margin: "10px 0" }} />
      </div>
      <TradeInfo
        trade_id={tradeId}
        chatroom_id={props.params.chatroom_id}
        onOpen={onOpen}
        sellerNickName={sellerNickName}
        setSellerNickName={setSellerNickName}
        userNickName={userNickName}
      />
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
                    {message.message === "adfoighaosigjoiaetjhoiasjerfoisaeut8oewithj" ? (
                      <></>
                    ) : (
                      <div
                        className="my-message"
                        style={{
                          backgroundColor: "#a0d3e9",
                          padding: "8px",
                          maxWidth: "200px",
                          borderRadius: "8px",
                          wordWrap: "break-word",
                        }}
                      >
                        {message.message}
                      </div>
                    )}
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
                    {message.message === "adfoighaosigjoiaetjhoiasjerfoisaeut8oewithj" ? (
                      userNickName === sellerNickName ? (
                        <></>
                      ) : (
                        <div
                          className="your-message-container"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "start",
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
                            {message.otherProfile === null ? (
                              <div>
                                <Image
                                  src={profile}
                                  alt="profile"
                                  width={50}
                                  height={50}
                                  style={{ borderRadius: "100%" }}
                                />
                              </div>
                            ) : (
                              <div>
                                <Avatar
                                  src={message.otherProfile}
                                  alt="profile"
                                  sx={{ margin: "auto", width: 50, height: 50 }}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <div>
                              <p>{message.otherNickname}</p>
                            </div>
                            <div
                              className="your-message"
                              style={{
                                backgroundColor: "rgb(247, 247, 247)",
                                padding: "8px",
                                maxWidth: "200px",
                                borderRadius: "8px",
                                marginLeft: "5px",
                                wordWrap: "break-word",
                              }}
                            >
                              <div>
                                <div>판매자는 어땠나요?</div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <Button
                                    onClick={() => {
                                      onOpen();
                                    }}
                                    style={{ backgroundColor: "#5E9FF2" }}
                                  >
                                    <p className="text-white">별점주기</p>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div
                        className="your-message-container"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "start",
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
                          {message.otherProfile === null ? (
                            <div>
                              <Image
                                src={profile}
                                alt="profile"
                                width={50}
                                height={50}
                                style={{ borderRadius: "100%" }}
                              />
                              <Image src={profile} alt="profile" objectFit="cover" />
                            </div>
                          ) : (
                            <div>
                              <Avatar
                                src={message.otherProfile}
                                alt="profile"
                                sx={{ margin: "auto", width: 50, height: 50 }}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <div>
                            <p>{message.otherNickname}</p>
                          </div>
                          <div
                            className="your-message"
                            style={{
                              backgroundColor: "rgb(247, 247, 247)",
                              padding: "8px",
                              maxWidth: "200px",
                              borderRadius: "8px",
                              marginLeft: "5px",
                              wordWrap: "break-word",
                            }}
                          >
                            <div>{message.message}</div>
                          </div>
                        </div>
                      </div>
                    )}
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
          isSaleDone={isSaleDone}
          setIsSaleDone={setIsSaleDone}
          isSellerRatingDone={isSellerRatingDone}
          setIsSellerRatingDone={setIsSellerRatingDone}
        />
      </div>
      <Rating
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        tradeId={tradeId}
        chatRoomId={props.params.chatroom_id}
        setIsSaleDone={setIsSaleDone}
      />
      <div style={{ height: "117px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
