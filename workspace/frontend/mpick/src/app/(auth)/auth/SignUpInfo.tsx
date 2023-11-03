"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from "axios";

export default function SignUpInfo(props: any) {
  const [userPwCheck, setUserPwCheck] = useState<boolean>(false);
  const [certifyPharse, setCertifyPharse] = useState<string>("");

  const validateEmail = (userEmail: string) =>
    userEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isEmailInvalid = useMemo(() => {
    if (props.userEmail === "") return false;
    return validateEmail(props.userEmail) ? false : true;
  }, [props.userEmail]);

  const validatePw = (userPw: string) =>
    userPw.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}
  const isPwInvalid = useMemo(() => {
    if (props.userPw === "") return false;
    return validatePw(props.userPw) ? false : true;
  }, [props.userPw]);

  const checkPw = (pw: string) => {
    if (pw === props.userPw) {
      setUserPwCheck(false);
      props.setIsInfoValid(true);
    } else {
      setUserPwCheck(true);
    }
  };

  const certifyEmail = () => {
    axios
      .get("/api/emails/verifications", {
        params: { email: props.userEmail, code: certifyPharse },
      })
      .then((res) => {
        alert("이메일 인증 성공");
        props.setUserEmailVerify(res.data.success);
      })
      .catch((err) => {
        alert("다시 입력해주세요");
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="flex justify-center" style={{ width: "100%", marginTop: "10px" }}>
        <Input
          isRequired
          label="아이디"
          variant="bordered"
          className="w-full"
          onValueChange={props.setUserId}
          defaultValue={props.userId}
        />
        <Button
          onClick={() => {
            props.idCheck();
          }}
          color="primary"
          style={{ height: "56px" }}
        >
          <p className="font-bold text-base">중복확인</p>
        </Button>
      </div>
      <div className="flex justify-center" style={{ width: "100%", marginTop: "20px" }}>
        <Input
          isRequired
          label="닉네임"
          variant="bordered"
          className="w-full"
          onValueChange={props.setUserNickName}
          defaultValue={props.userNickName}
        />
        <Button
          onClick={() => {
            props.nickNameCheck();
          }}
          color="primary"
          style={{ height: "56px" }}
        >
          <p className="font-bold text-base">중복확인</p>
        </Button>
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Input
          isRequired
          label="비밀번호"
          type="password"
          variant="bordered"
          isInvalid={isPwInvalid}
          color={isPwInvalid ? "danger" : "default"}
          description="영어, 숫자, 특수문자를 포함해 8자 이상 입력해주세요"
          className="w-full"
          onValueChange={props.setUserPw}
        />
      </div>
      <div style={{ width: "100%", marginTop: "10px" }}>
        <Input
          isRequired
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
      <div className="flex justify-center" style={{ width: "100%", marginTop: "20px" }}>
        <Input
          isRequired
          type="email"
          label="이메일"
          variant="bordered"
          fullWidth
          isInvalid={isEmailInvalid}
          color={isEmailInvalid ? "danger" : "default"}
          errorMessage={isEmailInvalid && "유효한 이메일이 아닙니다"}
          className="w-full"
          onValueChange={props.setUserEmail}
          defaultValue={props.userEmail}
        />
        <Button
          onClick={() => {
            props.emailCheck();
          }}
          color="primary"
          style={{ height: "56px" }}
        >
          <p className="font-bold text-base">본인인증</p>
        </Button>
      </div>
      <div className="flex justify-center" style={{ width: "100%", marginTop: "20px" }}>
        <Input
          isRequired
          label="인증번호"
          variant="bordered"
          fullWidth
          className="w-full"
          onValueChange={setCertifyPharse}
          defaultValue={certifyPharse}
        />
        <Button
          onClick={() => {
            certifyEmail();
          }}
          color="primary"
          style={{ height: "56px" }}
        >
          <p className="font-bold text-base">인증</p>
        </Button>
      </div>
    </div>
  );
}
