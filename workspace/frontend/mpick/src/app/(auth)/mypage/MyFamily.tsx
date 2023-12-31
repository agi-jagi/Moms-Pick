"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
import Swal from "sweetalert2";
import MyInfo from "./MyInfo";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

export default function MyFamily() {
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
    } catch (error) {
      console.log("아이 정보 업데이트 실패");
    }
  };

  const handleDelete = async () => {
    const babyId = selectedBaby.babyId;
    const babyData = {
      babyId: selectedBaby.babyId,
    };
    try {
      const response = await instance.delete("/api/profiles/child", { data: babyData });
      const deleteBabyInfo = babyList.filter((baby) => baby.babyId !== babyId);
      setBabyList(deleteBabyInfo);
      setUpdateModal(false);
    } catch (error) {
      console.log("아이 정보 삭제 실패");
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
    } catch (error) {
      console.log("아이 정보 추가 실패");
    }
  };

  const addNewBaby = () => {
    if (newBaby.babyName && newBaby.babyGender && newBaby.babyBirth && newBaby.babyOrder) {
      registerBaby();
      closeModal();
    } else {
      Swal.fire({
        icon: "warning",
        title: "<div style='font-size:20px'>아이 정보를 모두 입력해 주세요.</div>",
        confirmButtonColor: "#5E9FF2",
      });

      return;
    }
  };

  const getBabyInfo = async () => {
    try {
      const response = await instance.get("/api/profiles/child");
      setBabyList(response.data.response);
    } catch (error) {
      console.log("아이 정보 가져오기 실패");
    }
  };

  useEffect(() => {
    getBabyInfo();
  }, []);

  const babyMonths = (birthDate: string) => {
    const inputDate: any = new Date(birthDate);
    const currentDate: any = new Date();
    const monthsDifference =
      currentDate.getMonth() -
      inputDate.getMonth() +
      12 * (currentDate.getFullYear() - inputDate.getFullYear());
    return monthsDifference;
  };

  return (
    <div
      style={{
        margin: "10px 20px 20px 20px",
        padding: "20px",
        borderRadius: "15px",
        backgroundColor: "white",
      }}
    >
      <MyInfo />
      {babyList.map((baby: any, index: number) => {
        const birth = babyMonths(baby.babyBirth);
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
                  <p className="text-lg">{birth}개월</p>
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
      <div className="flex justify-center mt-5 pt-5" style={{ borderTop: "1px solid" }}>
        <div className="flex items-center">
          <p className="font-bold text-lg mr-1">새 가족이 생겼어요</p>
          <div onClick={showModal}>
            <AiOutlinePlusCircle size="30" />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal} className="z-0">
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
              <Button onClick={addNewBaby} className="w-full bg-[#5E9FF2] text-white">
                추가
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
