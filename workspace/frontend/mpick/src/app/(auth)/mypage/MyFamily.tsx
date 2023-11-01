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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MyFamily() {
  const [baby, setBaby] = useState<any>([{ name: "", gender: "", birth: "" }]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newBaby, setNewBaby] = useState({ name: "", gender: "", birth: "" });

  console.log(baby);
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const addNewBaby = () => {
    setBaby([...baby, newBaby]);
    closeModal();
    setNewBaby({ name: "", gender: "", birth: "" });
  };

  const deleteInfo = (index: number) => {
    const originBaby = [...baby];
    originBaby.splice(index, 1);
    setBaby(originBaby);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Image
            src={profile}
            alt="profile"
            width={60}
            height={60}
            style={{ borderRadius: "100%" }}
          />
          <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
            <div>
              <p className="font-bold text-base">Full Snack Designer</p>
              <p>기본 위치 : </p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
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
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {info.gender === "M" ? (
                <Image
                  src={boy}
                  alt="boy"
                  width={60}
                  height={60}
                  style={{ borderRadius: "100%" }}
                />
              ) : (
                <Image
                  src={girl}
                  alt="girl"
                  width={60}
                  height={60}
                  style={{ borderRadius: "100%" }}
                />
              )}
              <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                <div>
                  <p className="font-bold text-base">{info.name}</p>
                  <p className="text-sm">{info.birth}</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IoIosArrowForward size="30" />
            </div>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid",
          marginTop: "20px",
          paddingTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="font-bold text-lg" style={{ marginRight: "5px" }}>
            새 가족이 생겼어요
          </p>
          <div onClick={showModal}>
            <AiOutlinePlusCircle size="30" />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={style}>
          <div>
            <p
              style={{
                marginLeft: "8%",
                marginBottom: "3%",
                fontWeight: "bold",
              }}
            >
              성별
            </p>
            <div
              style={{
                display: "flex",
                gap: "10%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <Button
                variant="bordered"
                style={{
                  width: "30%",
                  height: "100%",
                  padding: "5%",
                  backgroundColor: newBaby.gender === "M" ? "#D0F0FD" : "transparent",
                }}
                onClick={() => genderSelected("M")}
              >
                <Image src="/boy.png" alt="남자 아기" width={80} height={80}></Image>
              </Button>
              <Button
                variant="bordered"
                style={{
                  width: "30%",
                  height: "100%",
                  padding: "5%",
                  backgroundColor: newBaby.gender === "F" ? "#FDD0EF" : "transparent",
                }}
                onClick={() => genderSelected("F")}
              >
                <Image src="/girl.png" alt="여자 아기" width={80} height={80}></Image>
              </Button>
            </div>

            <div style={{ marginLeft: "8%", marginBottom: "5%" }}>
              <p style={{ marginBottom: "3%", fontWeight: "bold" }}>아이 별명</p>
              <Input
                isRequired
                isClearable
                label="아이 별명"
                variant="bordered"
                className="w-11/12"
                radius={"sm"}
                onValueChange={(name) => nameInput(name)}
                value={newBaby.name}
              ></Input>
            </div>

            <div style={{ marginLeft: "8%" }}>
              <p style={{ marginBottom: "3%", fontWeight: "bold" }}>태어난 날 (출산 예정일)</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="생년월일"
                  disableFuture={true}
                  onChange={(newDate: dayjs.Dayjs | null) => birthInput(newDate)}
                  format="YYYY-MM-DD"
                  sx={{ width: "91%" }}
                ></DatePicker>
              </LocalizationProvider>
            </div>
            <div className="flex justify-center mt-8">
              <Button onClick={closeModal} className="mr-4">
                닫기
              </Button>
              <Button onClick={addNewBaby}>추가</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
