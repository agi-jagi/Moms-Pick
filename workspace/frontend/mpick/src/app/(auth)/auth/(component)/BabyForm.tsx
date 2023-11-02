"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import dayjs from "dayjs";

interface BabyFormProps {
  genderSelected: (gender: string) => void;
  nameInput: (name: string) => void;
  birthInput: (birth: dayjs.Dayjs | null) => void;
  newBaby: {
    name: string;
    gender: string;
    birth: string;
  };
}

const BabyForm: React.FC<BabyFormProps> = ({ genderSelected, nameInput, birthInput, newBaby }) => {
  return (
    <div>
      {/* 성별 선택 부분 */}
      <p className="ml-6 mb-3 font-bold">성별</p>
      <div
        className="flex gap-8 justify-center items-center mb-5"
        // style={{
        //   display: "flex",
        //   gap: "10%",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   marginBottom: "5%",
        // }}
      >
        {/* 남자 아기 버튼 */}
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

        {/* 여자 아기 버튼 */}
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

      {/* 아이 별명 입력 부분 */}
      <div className="ml-6 mb-5">
        <p className="mb-3 font-bold">아이 별명</p>
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

      {/* 태어난 날 (출산 예정일) 입력 부분 */}
      <div className="ml-6">
        <p className="mb-3 font-bold">태어난 날 (출산 예정일)</p>
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
    </div>
  );
};

export default BabyForm;
