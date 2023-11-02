"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import dayjs from "dayjs";
import { AiOutlineClose } from "react-icons/ai";

interface BabyFormProps {
  genderSelected: (gender: string) => void;
  nameInput: (name: string) => void;
  birthInput: (birth: dayjs.Dayjs | null) => void;
  newBaby: {
    name: string;
    gender: string;
    birth: string;
  };
  closeModal: () => void;
}

const BabyForm: React.FC<BabyFormProps> = ({
  genderSelected,
  nameInput,
  birthInput,
  newBaby,
  closeModal,
}) => {
  return (
    <div>
      <div className="flex justify-end mb-3" onClick={closeModal}>
        <AiOutlineClose style={{ fontSize: "180%" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p className="font-bold text-2xl mb-4">새로운 가족</p>
      </div>
      <p className="ml-1 mb-3 font-bold">성별</p>
      <div className="flex gap-8 justify-center items-center mb-5">
        <Button
          variant="bordered"
          className="w"
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

      <div className="mb-5">
        <p className="ml-1 mb-3 font-bold">아이 별명</p>
        <div className="flex justify-center">
          <Input
            isRequired
            isClearable
            label="아이 별명"
            variant="bordered"
            className="w-full"
            radius={"sm"}
            onValueChange={(name) => nameInput(name)}
            value={newBaby.name}
          ></Input>
        </div>
      </div>
      <div>
        <p className="ml-1 mb-3 font-bold">태어난 날 (출산 예정일)</p>
        <div className="flex justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="생년월일"
              disableFuture={true}
              onChange={(newDate: dayjs.Dayjs | null) => birthInput(newDate)}
              format="YYYY-MM-DD"
              sx={{ width: "100%" }}
            ></DatePicker>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default BabyForm;
