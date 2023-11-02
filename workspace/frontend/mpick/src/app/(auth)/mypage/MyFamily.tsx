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
  const [baby, setBaby] = useState<any>([{ name: "", gender: "", birth: "" }]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newBaby, setNewBaby] = useState<any>({ name: "", gender: "", birth: "" });

  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [selectedBaby, setSelectedBaby] = useState<any>({});

  console.log(baby);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const showUpdateModal = (baby: any) => {
    setSelectedBaby(baby);
    setUpdateModal(true);
  };

  const handleUpdateBaby = (updateBaby: any) => {
    setBaby(baby.map((b: any) => (b === selectedBaby ? updateBaby : b)));
  };

  const handleDelete = () => {
    console.log("삭제 완료");
  };

  const genderSelected = (gender: string) => {
    setNewBaby({ ...newBaby, gender });
  };

  const nameInput = (name: string) => {
    setNewBaby({ ...newBaby, name });
  };

  const birthInput = (birth: dayjs.Dayjs | null) => {
    if (birth) {
      const formattedBirth = birth.format("YYYY-MM-DD");
      setNewBaby({ ...newBaby, birth: formattedBirth });
    }
  };

  // 빈 값이면 추가 안 되도록 하기
  const addNewBaby = () => {
    setBaby([...baby, newBaby]);
    closeModal();
    setNewBaby({ name: "", gender: "", birth: "" });
  };

  useEffect(() => {
    const date = new Date();
    const today = date.toLocaleDateString("ko-kr");
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
              <p className="font-bold text-base">Full Snack Designer</p>
              <p>기본 위치 : </p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <IoIosArrowForward size="30" />
        </div>
      </div>
      {baby.map((info: any, index: number) => {
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
            onClick={() => showUpdateModal(info)}
          >
            <div className="flex justify-between">
              {info.gender === "M" ? (
                <Image
                  src={boy}
                  alt="boy"
                  width={70}
                  height={70}
                  style={{ borderRadius: "100%" }}
                />
              ) : info.gender === "F" ? (
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
                  <p className="font-bold text-xl">{info.name}</p>
                  <p className="text-lg">{info.birth}</p>
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
        babyInfo={selectedBaby}
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
              newBaby={newBaby}
              closeModal={closeModal}
            ></BabyForm>
            <div className="flex justify-center mt-8">
              <Button
                onClick={addNewBaby}
                className="w-11/12"
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
