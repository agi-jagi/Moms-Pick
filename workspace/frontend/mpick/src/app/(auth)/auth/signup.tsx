"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function Signup() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userPwCheck, setUserPwCheck] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userNickName, setUserNickName] = useState<string>("");

  const validateEmail = (userEmail: string) =>
    userEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isEmailInvalid = useMemo(() => {
    if (userEmail === "") return false;
    return validateEmail(userEmail) ? false : true;
  }, [userEmail]);

  const validatePw = (userPw: string) =>
    userPw.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    );
  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}
  const isPwInvalid = useMemo(() => {
    if (userPw === "") return false;
    return validatePw(userPw) ? false : true;
  }, [userPw]);

  const checkPw = (pw: string) => {
    if (pw === userPw) {
      setUserPwCheck(false);
    }
    setUserPwCheck(true);
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <div
        className="flex w-full flex-wrap md:flex-nowrap gap-4"
        style={{ justifyContent: "center" }}
      >
        <p className="font-bold text-3xl">회원 정보 입력</p>
        <div
          className="flex justify-center"
          style={{ width: "100%", marginTop: "10px" }}
        >
          <Input
            isRequired
            isClearable
            label="아이디"
            variant="bordered"
            className="w-full"
            onValueChange={setUserId}
          />
          <Button color="primary" style={{ height: "100%" }}>
            <p className="font-bold text-base">중복확인</p>
          </Button>
        </div>
        <div
          className="flex justify-center"
          style={{ width: "100%", marginTop: "10px" }}
        >
          <Input
            isRequired
            isClearable
            label="닉네임"
            variant="bordered"
            className="w-full"
            onValueChange={setUserNickName}
          />
          <Button color="primary" style={{ height: "100%" }}>
            <p className="font-bold text-base">중복확인</p>
          </Button>
        </div>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <Input
            isRequired
            isClearable
            label="비밀번호"
            type="password"
            variant="bordered"
            isInvalid={isPwInvalid}
            color={isPwInvalid ? "danger" : "default"}
            description="영어, 숫자, 특수문자를 포함해 8자 이상 입력해주세요"
            className="w-full"
            onValueChange={setUserPw}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Input
            isRequired
            isClearable
            label="비밀번호 확인"
            type="password"
            variant="bordered"
            className="w-full"
            isInvalid={userPwCheck}
            color={userPwCheck ? "danger" : "default"}
            errorMessage={userPwCheck && "비밀번호가 일치하지 않습니다"}
            onValueChange={checkPw}
          />
        </div>
        <div style={{ width: "100%", marginTop: "10px" }}>
          <Input
            isRequired
            isClearable
            type="email"
            label="이메일"
            variant="bordered"
            fullWidth
            isInvalid={isEmailInvalid}
            color={isEmailInvalid ? "danger" : "default"}
            errorMessage={isEmailInvalid && "유효한 이메일이 아닙니다"}
            className="w-full"
            onValueChange={setUserEmail}
          />
        </div>
        <div
          style={{
            width: "100%",
            margin: "30px",
            padding: "0 20px",
            height: "50px",
            position: "fixed",
            bottom: "0",
            zIndex: "2",
          }}
        >
          <Button
            color="primary"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <p className="font-bold text-xl">다음</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
