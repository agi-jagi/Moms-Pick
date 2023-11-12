'use client'

import { useState, useEffect, useMemo } from "react";
import GoBack from "../../auth/GoBack";
import Image from "next/image";
import profile from "../../../../../public/profile.png";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import instance from "@/app/_config/axios";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ChangePw from './changepw'

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -60%)",
  width: "90%",
  bgcolor: "background.paper",
  p: 4,
};

export default function EditMyInfo() {
  const [prevNickName, setPrevNickName] = useState<string>("");
  const [prevAddress, setPrevAddress] = useState<string>("");
  const [prevEmail, setPrevEmail] = useState<string>("");
  const [userNickName, setUserNickName] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [prevUserPw, setPrevUserPw] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userPwCheck, setUserPwCheck] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false)
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

  const validateEmail = (userEmail: string) =>
    userEmail.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isEmailInvalid = useMemo(() => {
    if (userEmail === "") return false;
    return validateEmail(userEmail) ? false : true;
  }, [userEmail]);

  const changeInfo = () => {
    if (userNickName != '') {
      instance.put('/api/users/change-nickname', {nickname:userNickName})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        Toast.fire({
          icon: "error",
          title: "닉네임 변경 실패",
        });
        return;
      })
    }
    // if (userEmail != '') {
    //   instance.put('/api/users/change-email', {email:'userNickName'})
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     Toast.fire({
    //       icon: "error",
    //       title: "닉네임 변경 실패",
    //     });
    //     return;
    //   })
    // }
    Toast.fire({
      icon: "success",
      title: "변경이 완료되었습니다",
    });
    router.push('/mypage')
  }

  useEffect(() => {
    instance
      .get("/api/users")
      .then((res) => {
        setPrevNickName(res.data.response.nickname);
        setPrevEmail(res.data.response.email);
      })
      .catch((err) => {});
    instance
      .get("/api/users/addresses")
      .then((res) => {
        for (let i = 0; res.data.response.length; i++) {
          if (res.data.response[i].isSet) {
            const address = res.data.response[i].addressString;
            const addressSplit = address.split(" ");
            for (let j = 0; addressSplit.length; j++) {
              if (addressSplit[j].charAt(addressSplit[j].length - 1) === "동") {
                setPrevAddress(addressSplit[j]);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display:'flex',
            justifyContent: 'space-between',
            padding: "20px 20px 0 30px",
          }}
        >
          <GoBack />
          <div className="flex justify-center">
            <p className="font-bold text-2xl">내 정보 수정</p>
          </div>
          <Button
            onClick={() => {
              changeInfo()
            }}
            color="primary"
          >
            <p className="text-base">저장</p>
          </Button>
        </div>
        <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
      </div>
      <hr style={{ borderTopWidth: "2px" }} />
      <div style={{ height: '100vh', padding: "20px 0", backgroundColor: "rgb(247, 247, 247)" }}>
      <div
      style={{
        margin: "10px 20px 20px 20px",
        padding: "20px",
        borderRadius: "15px",
        backgroundColor: "white",
      }}
    >
      <div className="flex justify-between">
        <div className="flex justify-between">
          <Image src={profile} alt="profile" width={70} style={{ borderRadius: "100%" }} />
          <div className="flex items-center ml-8">
              <Input
                label="닉네임 변경"
                labelPlacement='outside'
                variant="bordered"
                className="w-full"
                onValueChange={setUserNickName}
                placeholder={prevNickName}
              />
          </div>
        </div>
        
      </div>
      <div>
          <div>
            <div
              style={{
                borderTop: "1px solid",
                marginTop: "20px",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p className="font-bold text-lg mr-1">위치 설정</p>
                <p className="text-base mr-1">기본 위치 : {userAddress}</p>
              </div>
              <div style={{ display: "flex", alignItems: "bottom" }}>
                <Button
                  onClick={() => {
                    router.push("/mypage/changeloc");
                  }}
                  color="primary"
                >
                  <p className="text-base">위치변경</p>
                </Button>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid",
                marginTop: "20px",
                paddingTop: "20px",
              }}
            >
              <Input
                type='email'
                label="이메일 변경"
                labelPlacement='outside'
                variant="bordered"
                className="w-full"
                isInvalid={isEmailInvalid}
                color={isEmailInvalid ? "danger" : "default"}
                errorMessage={isEmailInvalid && "유효한 이메일이 아닙니다"}
                onValueChange={setUserEmail}
                placeholder={prevEmail}
              />
            </div>
            <div
              style={{
                borderTop: "1px solid",
                marginTop: "20px",
                paddingTop: "20px",
                display:'flex',
                justifyContent:'center'
              }}
            >
              <Button
                onClick={() => {
                  setOpen(true)
                }}
                color="primary"
              >
                <p className="text-base">비밀번호 변경</p>
              </Button>
            </div>
          </div>
      </div>
      </div>
      </div>
      <Modal open={open} className="z-0">
        <Box sx={style}>
          <ChangePw setOpen={setOpen}/>
        </Box>
      </Modal>
    </div>
  );
}
