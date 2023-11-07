"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import logo from "../../../../public/MOM_s_PICK__2_-removebg-preview.png";
import axios from "axios";
import instance from "@/app/_config/axios";

export default function Login() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const router = useRouter();

  const login = () => {
    axios
      .post("api/auth/login", {
        loginId: userId,
        password: userPw,
      })
      .then((res) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", res.data.response);
          router.push("/trade");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 인터셉터 적용 예시
  const test = () => {
    instance
      .get("/api/test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image src={logo} alt="logo" width={500} height={500} />
        </div>
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
        {/* <div className="flex flex-row-reverse ">
          <Link href="/auth">
            <p className="font-bold">회원가입</p>
          </Link>
        </div> */}
      </div>
      <div
        style={{
          width: "100%",
          margin: "30px 0",
          padding: "0 20px",
          height: "50px",
          position: "fixed",
          bottom: "50px",
          zIndex: "12",
        }}
      >
        <Button
          onClick={() => {
            login();
          }}
          color="primary"
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "15px",
          }}
        >
          <p className="font-bold text-xl">로그인</p>
        </Button>
        <Button
          onClick={() => {
            router.push("/auth");
          }}
          color="default"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <p className="font-bold text-xl">회원가입</p>
        </Button>
      </div>
    </div>
  );
}
