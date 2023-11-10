"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import { IoIosArrowForward } from "react-icons/io";
import instance from "@/app/_config/axios";

export default function MyInfo() {
  const [userNickName, setUserNickName] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");

  useEffect(() => {
    instance
      .get("/api/users")
      .then((res) => {
        setUserNickName(res.data.response.nickname);
      })
      .catch((err) => {});
    instance
      .get("/api/users/addresses")
      .then((res) => {
        for (let i = 0; res.data.response.length; i++) {
          if (res.data.response[i].isSet) {
            const address = res.data.response[i].addressString;
            const addressSplit = address.split(" ");
            for (let j = 0; addressSplit.length; j++) {
              if (addressSplit[j].charAt(addressSplit[j].length - 1) === "동") {
                setUserAddress(addressSplit[j]);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-between">
      <div className="flex justify-between">
        <Image
          src={profile}
          alt="profile"
          width={70}
          height={70}
          style={{ borderRadius: "100%" }}
        />
        <div className="flex items-center ml-8">
          <div>
            <p className="font-bold text-base">{userNickName}</p>
            <p>최근 위치 : {userAddress}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <IoIosArrowForward size="30" />
      </div>
    </div>
  );
}
