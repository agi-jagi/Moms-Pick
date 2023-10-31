"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import SignupInfo from "./SignUpInfo";
import AddressSearch from "./AddressSearch";

export default function SignUp() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userNickName, setUserNickName] = useState<string>("");
  const [isInfoValid, setIsInfoValid] = useState<boolean>(false);
  const [signupStep, setSignupStep] = useState<number>(0);

  const isWriteAll = () => {
    if (userId === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (userNickName === "") {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (userPw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (userEmail === "") {
      alert("이메일을 입력해주세요");
      return;
    }
    if (isInfoValid === false) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    nextStep();
  };

  const nextStep = () => {
    setSignupStep(signupStep + 1);
  };

  const prevStep = () => {
    setSignupStep(signupStep - 1);
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <div
        className="flex w-full flex-wrap md:flex-nowrap gap-4"
        style={{ justifyContent: "center" }}
      >
        <p className="font-bold text-3xl">회원 정보 입력</p>
        {signupStep === 0 ? (
          <SignupInfo
            userId={userId}
            setUserId={setUserId}
            userPw={userPw}
            setUserPw={setUserPw}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userNickName={userNickName}
            setUserNickName={setUserNickName}
            setIsInfoValid={setIsInfoValid}
          />
        ) : (
          <AddressSearch />
        )}
        {signupStep === 0 ? (
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
              onClick={() => {
                isWriteAll();
              }}
              color="primary"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <p className="font-bold text-xl">다음</p>
            </Button>
          </div>
        ) : (
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
            className="flex justify-around"
          >
            <Button
              onClick={() => {
                prevStep();
              }}
              color="default"
              style={{
                width: "45%",
                height: "100%",
              }}
            >
              <p className="font-bold text-xl">이전</p>
            </Button>
            <Button
              onClick={() => {
                nextStep();
              }}
              color="primary"
              style={{
                width: "45%",
                height: "100%",
              }}
            >
              <p className="font-bold text-xl">다음</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
