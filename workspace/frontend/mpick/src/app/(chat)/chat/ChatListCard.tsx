"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Image, Button } from "@nextui-org/react";
import Avatar from "@mui/material/Avatar";
import profile from "../../../../public/profile.png";
import instance from "@/app/_config/axios";
import { useRouter } from "next/navigation";
import { useUnReadStore } from "@/store/UnReadStore";
import { useOpponent } from "@/store/ChattingStore";

export default function Chat() {
  const router = useRouter();
  const [chatList, setChatList] = useState<any>([]);
  const { decrement } = useUnReadStore();
  const { setNickName } = useOpponent();

  const timeCheck = (time: string) => {
    const dateString = time;
    const inputDate: any = new Date(dateString);
    const currentDate: any = new Date();
    const timeDifference = currentDate - inputDate;

    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.floor(timeDifference / millisecondsInADay);
    const hoursDifference = Math.floor((timeDifference % millisecondsInADay) / (60 * 60 * 1000));
    const minutesDifference = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

    if (daysDifference === 0) {
      if (hoursDifference > 0) {
        return `${hoursDifference}시간 전`;
      }
      return `${minutesDifference}분 전`;
    } else {
      return `${daysDifference}일 전`;
    }
  };

  useEffect(() => {
    instance
      .get("/api/chattings")
      .then((res) => {
        console.log("chat", res.data.response);
        setChatList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {chatList.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          채팅기록이 없습니다
        </div>
      ) : (
        chatList.map((info: any, index: any) => {
          const timeDiff = timeCheck(info.lastDateTime);
          return (
            <div
              key={index}
              style={{ margin: "20px 20px 0 20px" }}
              onClick={() => {
                router.push(`/chat/chatting/${info.chatRoomId}`);
                setNickName(info.nickname);
                decrement(info.unreadCount);
              }}
            >
              <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "15px" }}>
                    {info.profileImage ? (
                      <Avatar
                        src={info.profileImage}
                        alt="profile"
                        sx={{ margin: "auto", width: 50, height: 50 }}
                      />
                    ) : (
                      <NextImage
                        src={profile}
                        alt="profile"
                        width={50}
                        height={50}
                        style={{ borderRadius: "100%" }}
                      />
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <p className="font-bold text-lg" style={{ marginRight: "10px" }}>
                        {info.nickname}
                      </p>

                      <div style={{ display: "flex", alignItems: "center" }}>
                        <p className="font-light text-xs">{timeDiff}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "200px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {info.lastMessage}
                    </div>
                  </div>
                </div>
                <div>
                  <Image src={info.tradeThumbnailImage} alt="물건사진" width={50} height={50} />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
