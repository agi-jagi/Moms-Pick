"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import logo from "../../../../public/MOM_s_PICK__2_-removebg-preview.png";
import axios from "axios";

export default function Login() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");

  const login = () => {
    axios
      .post("/api/login", {
        loginId: userId,
        password: userPw,
      })
      .then((res) => {
        console.log(res);
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <Image src={logo} alt="logo" width={500} height={500} />
      <div style={{ width: "100%", marginTop: "10px" }}>
        <Input label="아이디" variant="bordered" className="w-full" onValueChange={setUserId} />
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Input
          label="비밀번호"
          type="password"
          variant="bordered"
          className="w-full"
          onValueChange={setUserPw}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={() => {
            login();
          }}
          color="primary"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <p className="font-bold text-xl">로그인</p>
        </Button>
      </div>
    </div>
  );
}
