'use client'

import { useState, useMemo } from "react";
import { Button, Input } from "@nextui-org/react";
import instance from "@/app/_config/axios";
import Swal from "sweetalert2";

export default function ChangePw(props:any) {
  const [prevUserPw, setPrevUserPw] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userPwCheck, setUserPwCheck] = useState<boolean>(false);
  const [isPwValid, setIsPwValid] = useState<boolean>(false)
  const [changePwReady, setChangePwReady] = useState<boolean>(false)

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

  const validatePw = (userPw: string) =>
    userPw.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}

  const isPrevPwInvalid = useMemo(() => {
    if (prevUserPw === "") return false;
    return validatePw(userPw) ? false : true;
  }, [prevUserPw]);

  const isPwInvalid = useMemo(() => {
    if (userPw === "") return false;
    const flag = validatePw(userPw)
    if (flag) {
      setIsPwValid(true)
      return false
    }
    return true;
  }, [userPw]);

  const checkPw = (pw: string) => {
    if (pw === userPw) {
      setUserPwCheck(false);
      setChangePwReady(true)
    } else {
      setUserPwCheck(true);
    }
  };

  const checkPrevPw = () => {
    instance.post('/api/users/check-password', {password: prevUserPw})
    .then((res) => {
      changePw()
    })
    .catch((err) => {
      Toast.fire({
        icon: "error",
        title: "이전 비밀번호를 확인해주세요",
      });
    })
  }

  const changePw = () => {
    if (userPw === '') {
      Toast.fire({
        icon: "error",
        title: "새 비밀번호를 입력해주세요",
      });
      return
    }
    if (changePwReady === false) {
      Toast.fire({
        icon: "error",
        title: "새 비밀번호를 확인해주세요",
      });
      return
    }

    if (isPwValid === false) {
      Toast.fire({
        icon: "error",
        title: "새 비밀번호를 확인해주세요",
      });
      return
    }
    if (prevUserPw === userPw) {
      Toast.fire({
        icon: "error",
        title: "다른 비밀번호를 입력해주세요",
      });
      return
    }

    instance.put('/api/users/change-password', {
      password:prevUserPw,
      newPassword:userPw,
    })
    .then((res) => {
      props.setOpen(false)
      Toast.fire({
        icon: "success",
        title: "비밀번호 변경 완료",
      });
    })
    .catch((err) => {
      console.log(err)
      Toast.fire({
        icon: "error",
        title: "에러",
      });
    })
  }

  return (
    <div>
      <p className="font-bold text-lg">비밀번호 변경</p>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Input
          isRequired
          label="기존 비밀번호"
          type="password"
          variant="bordered"
          className="w-full"
          onValueChange={setPrevUserPw}
        />
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Input
          isRequired
          label="새 비밀번호"
          type="password"
          variant="bordered"
          isInvalid={isPwInvalid}
          color={isPwInvalid ? "danger" : "default"}
          description="영어, 숫자, 특수문자를 포함해 8자 이상 입력해주세요"
          className="w-full"
          onValueChange={setUserPw}
        />
      </div>
      <div style={{ width: "100%", marginTop: "10px" }}>
        <Input
          isRequired
          label="새 비밀번호 확인"
          type="password"
          variant="bordered"
          className="w-full"
          isInvalid={userPwCheck}
          color={userPwCheck ? "danger" : "default"}
          errorMessage={userPwCheck && "비밀번호가 일치하지 않습니다"}
          onValueChange={checkPw}
        />
      </div>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
        <Button
          onClick={() => {
            props.setOpen(false)
          }}
          color="default"
        >
          <p className="text-base">취소</p>
        </Button>
        <Button
          onClick={() => {
            checkPrevPw()
          }}
          color="primary"
        >
          <p className="text-base">변경</p>
        </Button>
      </div>
    </div>
  )
}