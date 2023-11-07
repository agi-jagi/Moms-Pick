"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import SignupInfo from "./SignUpInfo";
import AddressSearch from "./AddressSearch";
import axios from "axios";
import instance from "@/app/_config/axios";
import Swal from "sweetalert2";

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
  const [certifyInput, setCertifyInput] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<any>("");
  const [longitude, setLongitude] = useState<any>("");
  const [address, setAddress] = useState<string>("");
  const router = useRouter();

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

  const isWriteAll = () => {
    if (userId === "") {
      Toast.fire({
        icon: "error",
        title: "아이디를 입력해주세요",
      });
      return;
    }
    if (userNickName === "") {
      Toast.fire({
        icon: "error",
        title: "닉네임을 입력해주세요",
      });
      return;
    }
    if (userPw === "") {
      Toast.fire({
        icon: "error",
        title: "비밀번호를 입력해주세요",
      });
      return;
    }
    if (userEmail === "") {
      Toast.fire({
        icon: "error",
        title: "이메일을 입력해주세요",
      });
      return;
    }
    if (isInfoValid === false) {
      Toast.fire({
        icon: "error",
        title: "비밀번호가 일치하지 않습니다",
      });
      return;
    }
    if (!userIdCheck) {
      Toast.fire({
        icon: "error",
        title: '아이디 중복체크가 필요합니다"',
      });
      return;
    }
    if (!userNickNameCheck) {
      Toast.fire({
        icon: "error",
        title: "닉네임 중복체크가 필요합니다",
      });
      return;
    }
    // if (!userEmailVerify) {
    //   Toast.fire({
    //     icon: 'error',
    //     title: '이메일 인증이 필요합니다'
    //   })
    //   return;
    // }

    nextStep();
  };

  const nextStep = () => {
    setSignupStep(signupStep + 1);
  };

  const prevStep = () => {
    setSignupStep(signupStep - 1);
  };

  const signup = () => {
    if (localStorage.getItem("accessToken")) {
      setUserAddress();
    } else {
      axios
        .post("/api/users/join", {
          loginId: userId,
          nickname: userNickName,
          password: userPw,
          email: userEmail,
        })
        .then((res) => {
          getToken();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getToken = () => {
    axios
      .post("api/users/login", {
        loginId: userId,
        password: userPw,
      })
      .then((res) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", res.data.response);
          setUserAddress();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setUserAddress = () => {
    instance
      .post("/api/users/addresses", {
        latitude: latitude,
        longitude: longitude,
        addressName: address,
        addressString: address,
        isSet: true,
      })
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다",
        });
        router.push("/auth/babyauth");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const idCheck = () => {
    if (userId === "") {
      Toast.fire({
        icon: "error",
        title: "아이디를 입력해주세요",
      });
      return;
    }
    axios
      .post(`/api/users/id-check`, {
        data: { loginId: userId },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          Toast.fire({
            icon: "success",
            title: "사용가능한 아이디입니다",
          });
          setUserIdCheck(res.data.success);
        } else {
          Toast.fire({
            icon: "error",
            title: "이미 사용중인 아이디입니다",
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "네트워크 에러",
        });
      });
  };

  const nickNameCheck = () => {
    if (userNickName === "") {
      Toast.fire({
        icon: "error",
        title: "닉네임을 입력해주세요",
      });
      return;
    }
    axios
      .post("/api/users/nickname-check", {
        data: { nickname: userNickName },
      })
      .then((res) => {
        if (res.data.success) {
          Toast.fire({
            icon: "success",
            title: "사용가능한 닉네임입니다",
          });
          setUserNickNameCheck(res.data.success);
        } else {
          Toast.fire({
            icon: "error",
            title: "이미 사용중인 닉네임입니다",
          });
        }
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "네트워크 에러",
        });
      });
  };

  const emailCheck = async () => {
    if (userEmail === "") {
      Toast.fire({
        icon: "error",
        title: "이메일을 입력해주세요",
      });
      return;
    }
    await axios
      .post("/api/users/email-check", {
        data: { email: userEmail },
      })
      .then((res) => {
        verifyEmail();
        setCertifyInput(true);
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "이미 가입된 이메일입니다",
        });
      });
  };

  const verifyEmail = async () => {
    await axios
      .post(`/api/emails/verification-requests?email=${userEmail}`)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "메일 전송 성공",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "메일 전송 실패",
        });
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
              certifyInput={certifyInput}
            />
          ) : (
            <AddressSearch
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              address={address}
              setAddress={setAddress}
            />
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
                signup();
              }}
              color="primary"
              style={{
                width: "45%",
                height: "100%",
              }}
            >
              <p className="font-bold text-xl">회원가입</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
