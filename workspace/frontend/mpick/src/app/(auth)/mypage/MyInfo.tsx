"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import instance from "@/app/_config/axios";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function MyInfo() {
  const [userNickName, setUserNickName] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userProfileImage, setUserProfileImage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    instance
      .get("/api/users")
      .then((res) => {
        setUserNickName(res.data.response.nickname);
        setUserEmail(res.data.response.email);
        if (res.data.response.profileImage) {
          setUserProfileImage(res.data.response.profileImage);
        }
        console.log(res.data.response);
      })
      .catch((err) => {});
    instance.get("/api/users/addresses").then((res) => {
      console.log(res);
      for (let i = 0; res.data.response.length; i++) {
        if (res.data.response[i].isSet) {
          const address = res.data.response[i].addressName;
          setUserAddress(address);
          // const addressSplit = address.split(" ");
          // for (let j = 0; addressSplit.length; j++) {
          //   if (addressSplit[j].charAt(addressSplit[j].length - 1) === "동") {
          //     setUserAddress(addressSplit[j]);
          //   }
          // }
        }
      }
    });
    // .catch((err) => {
    //   console.log(err);
    // });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex justify-between">
          {userProfileImage === "" ? (
            <Image src={profile} alt="profile" width={70} style={{ borderRadius: "100%" }} />
          ) : (
            <Image
              src={userProfileImage}
              alt="profile"
              width={70}
              height={70}
              style={{ borderRadius: "100%" }}
            />
          )}
          <div className="flex items-center ml-8">
            <div>
              <p className="font-bold text-base">{userNickName}</p>
              {open ? (
                <Button
                  onClick={() => {
                    router.push("/mypage/edit");
                  }}
                  color="primary"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <p className="text-base">내 정보 수정</p>
                </Button>
              ) : (
                <p>최근 위치 : {userAddress}</p>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex items-center"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? (
            <div>
              <IoIosArrowDown size="30" />
            </div>
          ) : (
            <div>
              <IoIosArrowForward size="30" />
            </div>
          )}
        </div>
      </div>
      <div>
        {open ? (
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
              <div style={{ display: "flex", alignItems: "center" }}>
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
              <p className="font-bold text-lg mr-1">이메일</p>
              <p className="text-base mr-1">{userEmail}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
