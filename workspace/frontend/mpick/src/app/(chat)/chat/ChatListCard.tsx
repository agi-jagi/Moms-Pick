"use client";

import { useState } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import car from "../../../../public/유모차.png";

export default function chat() {
  const [chatList, setChatList] = useState<any>([
    {
      name: "이름",
      address: "주소",
      time: "시간",
      recentChat: "최근채팅",
    },
    {
      name: "이름",
      address: "주소",
      time: "시간",
      recentChat: "최근채팅",
    },
  ]);

  return (
    <div>
      {chatList.map((info: any, index: any) => {
        return (
          <div style={{ margin: "20px 20px 0 20px" }}>
            <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <Image
                    src={profile}
                    alt="profile"
                    width={50}
                    height={50}
                    style={{ borderRadius: "100%" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex" }}>
                    <p className="font-bold" style={{ marginRight: "10px" }}>
                      {info.name}
                    </p>
                    <p className="font-light" style={{ marginRight: "10px" }}>
                      {info.address}
                    </p>
                    <p className="font-light">{info.time}</p>
                  </div>
                  <div>
                    <p>{info.recentChat}</p>
                  </div>
                </div>
              </div>
              <div>
                <Image src={car} alt="물건사진" width={50} height={50} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
