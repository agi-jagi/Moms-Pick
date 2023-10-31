"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import boy from "../../../../public/boy.png";
import girl from "../../../../public/girl.png";

export default function MyFamily() {
  const [baby, setBaby] = useState<any>([
    { name: "아들", gender: "boy", birth: "2023-08-10" },
    { name: "딸", gender: "girl", birth: "2023-08-10" },
  ]);

  useEffect(() => {
    const date = new Date();
    const today = date.toLocaleDateString("ko-kr");
  }, []);

  return (
    <div
      style={{
        margin: "10px 20px 20px 20px",
        padding: "20px",
        borderRadius: "15px",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Image
            src={profile}
            alt="profile"
            width={80}
            height={80}
            style={{ borderRadius: "100%" }}
          />
          <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
            <div>
              <p className="font-bold text-base">Full Snack Designer</p>
              <p>기본 위치 : </p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IoIosArrowForward size="30" />
        </div>
      </div>
      {baby.map((info: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid",
              marginTop: "20px",
              paddingTop: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {info.gender === "boy" ? (
                <Image
                  src={boy}
                  alt="boy"
                  width={80}
                  height={80}
                  style={{ borderRadius: "100%" }}
                />
              ) : (
                <Image
                  src={girl}
                  alt="girl"
                  width={80}
                  height={80}
                  style={{ borderRadius: "100%" }}
                />
              )}
              <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                <div>
                  <p className="font-bold text-base">{info.name}</p>
                  <p>{info.birth}</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IoIosArrowForward size="30" />
            </div>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="font-bold text-xl" style={{ marginRight: "5px" }}>
            새 가족이 생겼어요
          </p>
          <div>
            <AiOutlinePlusCircle size="30" />
          </div>
        </div>
      </div>
    </div>
  );
}
