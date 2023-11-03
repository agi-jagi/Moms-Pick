"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import SignupInfo from "./SignUpInfo";
import AddressSearch from "./AddressSearch";
import axios from "axios";

export default function SignUp() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userNickName, setUserNickName] = useState<string>("");
  const [isInfoValid, setIsInfoValid] = useState<boolean>(false);
  const [signupStep, setSignupStep] = useState<number>(0);
  const [userIdCheck, setUserIdCheck] = useState<boolean>(false);
  const [userNickNameCheck, setUserNickNameCheck] = useState<boolean>(false);
  const [userEmailVerify, setUserEmailVerify] = useState<boolean>(false);

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
    if (!userIdCheck) {
      alert("아이디 중복체크가 필요합니다");
      return;
    }
    if (!userNickNameCheck) {
      alert("닉네임 중복체크가 필요합니다");
      return;
    }
    // if (!userEmailVerify) {
    //   alert("이메일 인증이 필요합니다");
    //   return;
    // }
    // nextStep();
    signup();
  };

  const nextStep = () => {
    setSignupStep(signupStep + 1);
  };

  const prevStep = () => {
    setSignupStep(signupStep - 1);
  };

  const signup = () => {
    axios
      .post("/api/users/join", {
        loginId: userId,
        nickname: userNickName,
        password: userPw,
        email: userEmail,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const idCheck = () => {
    if (userId === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    axios
      .get(`/api/users/id-check`, {
        params: { loginId: userId },
      })
      .then((res) => {
        if (res.data.success) {
          alert("사용가능한 아이디입니다");
          setUserIdCheck(res.data.success);
        } else {
          alert("이미 사용중인 아이디입니다");
        }
      })
      .catch(() => {
        alert("네트워크 에러");
      });
  };

  const nickNameCheck = () => {
    if (userNickName === "") {
      alert("닉네임을 입력해주세요");
      return;
    }
    axios
      .get("/api/users/nickname-check", {
        params: { nickname: userNickName },
      })
      .then((res) => {
        if (res.data.success) {
          alert("사용가능한 닉네임입니다");
          setUserNickNameCheck(res.data.success);
        } else {
          alert("이미 사용중인 닉네임입니다");
        }
      })
      .catch(() => {
        alert("네트워크 에러");
      });
  };

  const emailCheck = async () => {
    if (userEmail === "") {
      alert("이메일을 입력해주세요");
      return;
    }
    await axios
      .get("/api/users/email-check", {
        params: { email: userEmail },
      })
      .then((res) => {
        verifyEmail();
      })
      .catch(() => {
        alert("이미 가입된 이메일입니다");
      });
  };

  const verifyEmail = async () => {
    await axios
      .post(`/api/emails/verification-requests?email=${userEmail}`)
      .then(() => {
        console.log("메일 전송 완료");
      })
      .catch((err) => {
        console.log(err);
        alert("메일 전송 실패");
      });
  };

  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className="font-bold text-3xl">회원 정보 입력</p>
        </div>
        <div style={{ margin: "0 20px" }}>
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
              idCheck={idCheck}
              nickNameCheck={nickNameCheck}
              emailCheck={emailCheck}
              setUserEmailVerify={setUserEmailVerify}
            />
          ) : (
            <AddressSearch />
          )}
        </div>
        {signupStep === 0 ? (
          <div
            style={{
              width: "100%",
              margin: "30px 0",
              padding: "0 20px",
              height: "50px",
              position: "fixed",
              bottom: "0",
              zIndex: "12",
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
              margin: "30px 0",
              padding: "0 20px",
              height: "50px",
              position: "fixed",
              bottom: "0",
              zIndex: "12",
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
