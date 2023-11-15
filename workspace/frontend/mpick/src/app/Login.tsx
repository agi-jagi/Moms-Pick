"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import logo from "../../public/MOM_s_PICK__2_-removebg-preview.png";
import axios from "axios";
import instance from "@/app/_config/axios";
import { useUnReadStore } from "@/store/UnReadStore";
import { useConnecting } from "@/store/WebSocket";
import { useNickNameSet } from "@/store/ChattingStore";
import Swal from "sweetalert2";

export default function Login() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const router = useRouter();
  const { reset } = useUnReadStore();
  const { setIsConnect } = useConnecting();
  const { setUserNickName } = useNickNameSet();

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const login = () => {
    axios
      .post("/api/auth/login", {
        loginId: userId,
        password: userPw,
      })
      .then((res) => {
        console.log(res);
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", res.data.response);
          getNickName();
          router.push("/trade");
          setIsConnect();
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          Toast.fire({
            icon: "error",
            title: "아이디 또는 비밀번호를 <br/> 다시 입력해주세요",
          });
        } else if (err.response.status === 502) {
          Toast.fire({
            icon: "error",
            title: "네트워크 에러",
          });
        }
      });
  };

  const getNickName = () => {
    instance
      .get("/api/users")
      .then((res) => {
        setUserNickName(res.data.response.nickname);
      })
      .catch((err) => {});
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

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/trade");
    }
    reset();
  }, []);

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
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "15px",
            backgroundColor: "#5E9FF2",
          }}
        >
          <p className="font-bold text-xl text-white">로그인</p>
        </Button>
        <Button
          onClick={() => {
            router.push("/auth");
          }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#bbc0c7",
          }}
        >
          <p className="font-bold text-xl text-white ">회원가입</p>
        </Button>
      </div>
    </div>
  );
}
