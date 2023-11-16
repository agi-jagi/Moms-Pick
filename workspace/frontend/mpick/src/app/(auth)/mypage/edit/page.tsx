"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import GoBack from "../../auth/GoBack";
import Image from "next/image";
import profile from "../../../../../public/profile.png";
import imageicon from "../../../../../public/image-icon.png";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import instance from "@/app/_config/axios";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ChangePw from "./changepw";
import Avatar from "@mui/material/Avatar";

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
  const [userProfile, setUserProfile] = useState<string>("");
  const [profileData, setProfileData] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement | null>(null);

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

  const uploadProfileImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setUserProfile(e.target.result);
      }
    };
    let formData = new FormData();
    formData.append("file", file);
    setProfileData(formData);
  };

  const changeInfo = async () => {
    if (userNickName != "") {
      await instance
        .put("/api/users/change-nickname", { nickname: userNickName })
        .then((res) => {})
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "닉네임 변경 실패",
          });
          return;
        });
    }
    if (userProfile != "") {
      await instance
        .put("/api/users/change-img", profileData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {})
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "프로필 이미지 변경 실패",
          });
          return;
        });
    }
    let count = 0;
    if (userEmail != "") {
      count++;
      await instance
        .post("/api/auth/emails/code-request", { email: userEmail })
        .then((res) => {
          Swal.fire({
            title: "이메일 인증코드를 입력하세요",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            showLoaderOnConfirm: true,
            preConfirm: async (code) => {
              try {
                instance
                  .put("/api/users/change-email", { email: userEmail, authCode: code })
                  .then((res) => {
                    Toast.fire({
                      icon: "success",
                      title: "변경이 완료되었습니다",
                    });
                    router.push("/mypage");
                  })
                  .catch((err) => {
                    Toast.fire({
                      icon: "error",
                      title: "이메일 변경 실패",
                    });
                    return;
                  });
              } catch (error) {
                Swal.showValidationMessage(`
                Request failed: ${error}
              `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "이메일 전송 실패",
          });
          return;
        });
    }
    if (count === 0) {
      Toast.fire({
        icon: "success",
        title: "변경이 완료되었습니다",
      });
      router.push("/mypage");
    }
  };

  useEffect(() => {
    instance
      .get("/api/users")
      .then((res) => {
        setPrevNickName(res.data.response.nickname);
        setPrevEmail(res.data.response.email);
        if (res.data.response.profileImage) {
          setUserProfile(res.data.response.profileImage);
        }
      })
      .catch((err) => {});
    instance
      .get("/api/users/addresses")
      .then((res) => {
        for (let i = 0; i < res.data.response.length; i++) {
          if (res.data.response[i].isSet) {
            const address = res.data.response[i].addressName;
            setPrevAddress(address);
          }
        }
      })
      .catch((err) => {});
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
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 20px 0 30px",
          }}
        >
          <GoBack />
          <div className="flex justify-center">
            <p className="font-bold text-2xl">내 정보 수정</p>
          </div>
          <Button
            onClick={() => {
              changeInfo();
            }}
            style={{
              backgroundColor: "#5E9FF2",
            }}
          >
            <p className="text-base text-white">저장</p>
          </Button>
        </div>
        <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
      </div>
      <hr style={{ borderTopWidth: "2px" }} />
      <div style={{ height: "100vh", padding: "20px 0", backgroundColor: "rgb(247, 247, 247)" }}>
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
              <a
                href="#"
                onClick={() => {
                  if (fileInput.current) {
                    fileInput.current.click();
                  }
                }}
              >
                <div>
                  <div style={{ position: "relative" }}>
                    {userProfile === "" ? (
                      <Image
                        src={profile}
                        alt="profile"
                        width={70}
                        style={{ borderRadius: "100%" }}
                      />
                    ) : (
                      <Avatar
                        src={userProfile}
                        alt="profile"
                        sx={{ margin: "auto", width: 70, height: 70 }}
                      />
                    )}
                    <div style={{ position: "absolute", bottom: "2px", right: "2px" }}>
                      <Image src={imageicon} alt="image-icon" width={20} />
                    </div>
                  </div>
                </div>
              </a>
              <input
                type="file"
                name="image_URL"
                id="input-file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={uploadProfileImage}
              />
              <div className="flex items-center ml-8">
                <Input
                  label="닉네임 변경"
                  labelPlacement="outside"
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
                  {userAddress === "" ? (
                    <p className="text-base mr-1">기본 위치 : {prevAddress}</p>
                  ) : (
                    <p className="text-base mr-1">기본 위치 : {userAddress}</p>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "bottom" }}>
                  <Button
                    onClick={() => {
                      router.push("/mypage/changeloc");
                    }}
                    style={{
                      backgroundColor: "#5E9FF2",
                    }}
                  >
                    <p className="text-base text-white">위치변경</p>
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
                  type="email"
                  label="이메일 변경"
                  labelPlacement="outside"
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
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  style={{
                    backgroundColor: "#5E9FF2",
                  }}
                >
                  <p className="text-base text-white">비밀번호 변경</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} className="z-0">
        <Box sx={style}>
          <ChangePw setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}
