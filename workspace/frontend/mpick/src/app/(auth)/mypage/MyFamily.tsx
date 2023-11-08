"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import boy from "../../../../public/boy.png";
import girl from "../../../../public/girl.png";
import { Button, Input } from "@nextui-org/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BabyForm from "./(component)/BabyForm";
import UpdateBabyInfo from "./(component)/UpdateBabyInfo";
import instance from "@/app/_config/axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MyFamily() {
  const [userNickName, setUserNickName] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");

  const [babyList, setBabyList] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newBaby, setNewBaby] = useState<any>({
    babyName: "",
    babyGender: "",
    babyBirth: "",
    babyOrder: 0,
  });

  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [selectedBaby, setSelectedBaby] = useState<any>({});

  console.log("babyList", babyList);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const showUpdateModal = (baby: any) => {
    setSelectedBaby(baby);
    setUpdateModal(true);
  };

  const genderSelected = (babyGender: string) => {
    setNewBaby({ ...newBaby, babyGender });
  };

  const nameInput = (babyName: string) => {
    setNewBaby({ ...newBaby, babyName });
  };

  const birthInput = (babyBirth: dayjs.Dayjs | null) => {
    if (babyBirth) {
      const formattedBirth = babyBirth.format("YYYY-MM-DD");
      setNewBaby({ ...newBaby, babyBirth: formattedBirth });
    }
  };

  const orderSelected = (babyOrder: number) => {
    setNewBaby({ ...newBaby, babyOrder });
  };

  const handleUpdateBaby = async (updateBaby: any) => {
    try {
      const response = await instance.patch("/api/profiles/child", updateBaby);
      setBabyList(
        babyList.map((baby) => {
          return baby.babyId === updateBaby.babyId ? updateBaby : baby;
        })
      );
      console.log(response.data.response, "아이 정보 업데이트 성공");
    } catch (error) {
      console.log("아이 정보 업데이트 실패", error);
    }
  };

  console.log("selectBaby", selectedBaby);
  const handleDelete = async () => {
    const babyId = selectedBaby.babyId;
    const babyData = {
      babyId: selectedBaby.babyId,
    };
    try {
      const response = await instance.delete("/api/profiles/child", { data: babyData });
      const deleteBabyInfo = babyList.filter((baby) => baby.babyId !== babyId);
      setBabyList(deleteBabyInfo);
      console.log(response.data.response, "아이 정보 삭제 성공");
      setUpdateModal(false);
    } catch (error) {
      console.log("아이 정보 삭제 실패", error);
    }
  };

  const registerBaby = async () => {
    const babyData = {
      babyName: newBaby.babyName,
      babyGender: newBaby.babyGender,
      babyBirth: newBaby.babyBirth,
      babyOrder: newBaby.babyOrder,
    };
    try {
      const response = await instance.post("/api/profiles/child", babyData);
      getBabyInfo();
      setNewBaby({ babyName: "", babyGender: "", babyBirth: "", babyOrder: 0 });
      console.log(response.data, "아이 정보 추가 성공");
    } catch (error) {
      console.log(error, "아이 정보 추가 실패");
    }
  };

  const addNewBaby = () => {
    if (newBaby.babyName && newBaby.babyGender && newBaby.babyBirth && newBaby.babyOrder) {
      registerBaby();
      closeModal();
    } else {
      alert("아이 정보를 모두 입력해 주세요.");
    }
  };

  const getBabyInfo = async () => {
    try {
      const response = await instance.get("/api/profiles/child");
      setBabyList(response.data.response);
      console.log("아이 정보 가져오기 성공", response.data.response);
    } catch (error) {
      console.log("아이 정보 가져오기 실패", error);
    }
  };

  useEffect(() => {
    const date = new Date();
    const today = date.toLocaleDateString("ko-kr");
    instance
      .get("/api/users")
      .then((res) => {
        setUserNickName(res.data.response.nickname);
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
                setUserAddress(addressSplit[j]);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getBabyInfo();
  }, []);

  return (
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
          <Image
            src={profile}
            alt="profile"
            width={70}
            height={70}
            style={{ borderRadius: "100%" }}
          />
          <div className="flex items-center ml-8">
            <div>
              <p className="font-bold text-base">{userNickName}</p>
              <p>최근 위치 : {userAddress}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <IoIosArrowForward size="30" />
        </div>
      </div>
      {babyList.map((baby: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid",
              marginTop: "20px",
              paddingTop: "20px",
            }}
            onClick={() => showUpdateModal(baby)}
          >
            <div className="flex justify-between">
              {baby.babyGender === "M" ? (
                <Image
                  src={boy}
                  alt="boy"
                  width={70}
                  height={70}
                  style={{ borderRadius: "100%" }}
                />
              ) : baby.babyGender === "F" ? (
                <Image
                  src={girl}
                  alt="girl"
                  width={70}
                  height={70}
                  style={{ borderRadius: "100%" }}
                />
              ) : (
                <div></div>
              )}
              <div className="flex items-center ml-8">
                <div>
                  <p className="font-bold text-xl">{baby.babyName}</p>
                  <p className="text-lg">{baby.babyBirth}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <IoIosArrowForward size="30" />
            </div>
          </div>
        );
      })}
      <UpdateBabyInfo
        open={updateModal}
        onClose={() => setUpdateModal(false)}
        selectedBaby={selectedBaby}
        handleUpdate={handleUpdateBaby}
        handleDelete={handleDelete}
      ></UpdateBabyInfo>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <div className="flex items-center">
          <p className="font-bold text-lg mr-1">새 가족이 생겼어요</p>
          <div onClick={showModal}>
            <AiOutlinePlusCircle size="30" />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={style}>
          <div>
            <BabyForm
              genderSelected={genderSelected}
              nameInput={nameInput}
              birthInput={birthInput}
              orderSelected={orderSelected}
              newBaby={newBaby}
              closeModal={closeModal}
            ></BabyForm>
            <div className="flex justify-center mt-8">
              <Button
                onClick={addNewBaby}
                className="w-full"
                style={{ backgroundColor: "#5E9FF2", color: "white" }}
              >
                추가
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
