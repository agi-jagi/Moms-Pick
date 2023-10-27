"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Search from "./addressSearch";

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
    <div>
      <div
        className="flex w-full flex-wrap md:flex-nowrap gap-4"
        style={{ justifyContent: "center" }}
      >
        <Input
          isRequired
          isClearable
          label="아이디"
          variant="bordered"
          className="max-w-xs"
          onValueChange={setUserId}
        />
        <Input
          isRequired
          isClearable
          label="비밀번호"
          type="password"
          variant="bordered"
          isInvalid={isPwInvalid}
          color={isPwInvalid ? "danger" : "default"}
          description="영어, 숫자, 특수문자를 포함해 8자 이상 입력해주세요"
          className="max-w-xs"
          onValueChange={setUserPw}
        />
        <Input
          isRequired
          isClearable
          label="비밀번호 확인"
          type="password"
          variant="bordered"
          className="max-w-xs"
          isInvalid={userPwCheck}
          color={userPwCheck ? "danger" : "default"}
          errorMessage={userPwCheck && "비밀번호가 일치하지 않습니다"}
          onValueChange={checkPw}
        />
        <Input
          isRequired
          isClearable
          type="email"
          label="이메일"
          variant="bordered"
          isInvalid={isEmailInvalid}
          color={isEmailInvalid ? "danger" : "default"}
          errorMessage={isEmailInvalid && "유효한 이메일이 아닙니다"}
          className="max-w-xs"
          onValueChange={setUserEmail}
        />
        <Input
          isRequired
          isClearable
          label="닉네임"
          variant="bordered"
          className="max-w-xs"
          onValueChange={setUserNickName}
        />
        <Button style={{ width: "100%", margin: "20px 35px" }}>회원가입</Button>
      </div>
    </div>
  );
}
