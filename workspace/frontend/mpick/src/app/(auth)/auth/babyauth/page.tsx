"use client";

import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

import { BiPlusCircle } from "react-icons/bi";

interface BabyInfo {
  babyName: string;
  birth: string;
  gender: "M" | "F" | "";
  isFolded: boolean;
}

export default function BabyAuth() {
  const [babyList, setBabyList] = useState<BabyInfo[]>([
    { babyName: "", birth: "", gender: "", isFolded: false },
  ]);
  console.log(babyList);

  const babyNameInput = (index: number, name: string) => {
    const newBaby = [...babyList];
    newBaby[index].babyName = name;
    setBabyList(newBaby);
  };

  const babyBirthInput = (index: number, date: dayjs.Dayjs | null) => {
    const newBaby = [...babyList];
    if (date) {
      newBaby[index].birth = date.format("YYYY-MM-DD");
      setBabyList(newBaby);
    }
  };

  const genderSelected = (index: number, gender: "M" | "F") => {
    const newBaby = [...babyList];
    newBaby[index].gender = gender;
    setBabyList(newBaby);
  };

  const addBabyInfo = () => {
    setBabyList([...babyList, { babyName: "", birth: "", gender: "", isFolded: false }]);
  };

  const deleteInfo = (index: number) => {
    const newBaby = [...babyList];
    newBaby.splice(index, 1);
    setBabyList(newBaby);
  };

  const handleToggle = (index: number) => {
    const newBaby = [...babyList];
    newBaby[index].isFolded = !newBaby[index].isFolded;
    setBabyList(newBaby);
  };

  return (
    <div>
      <h1 className="font-bold mb-4 text-center text-2xl">아이 정보 입력</h1>

      {babyList.map((baby: BabyInfo, index: number) => (
        <div key={index}>
          <div className="flex ml-1">
            <span onClick={() => handleToggle(index)}>
              {baby.isFolded ? (
                <AiFillCaretUp className="text-2xl" />
              ) : (
                <AiFillCaretDown className="text-2xl" />
              )}
            </span>
            <span>{index + 1}번째 아기</span>
          </div>
          {!baby.isFolded && (
            <div>
              <span onClick={() => deleteInfo(index)} className="flex justify-end mr-2 mb-2">
                <AiFillMinusCircle className="text-2xl" />
              </span>
              <p className="ml-5 mb-3 font-bold">성별</p>
              <div className="flex gap-10 justify-center items-center mb-5">
                <Button
                  variant="bordered"
                  style={{
                    width: "30%",
                    height: "100%",
                    padding: "5%",
                    backgroundColor: baby.gender === "M" ? "#D0F0FD" : "transparent",
                  }}
                  onClick={() => genderSelected(index, "M")}
                >
                  <Image src="/boy.png" alt="남자 아기" width={80} height={80}></Image>
                </Button>
                <Button
                  variant="bordered"
                  style={{
                    width: "30%",
                    height: "100%",
                    padding: "5%",
                    backgroundColor: baby.gender === "F" ? "#FDD0EF" : "transparent",
                  }}
                  onClick={() => genderSelected(index, "F")}
                >
                  <Image src="/girl.png" alt="여자 아기" width={80} height={80}></Image>
                </Button>
              </div>
              <div className="mb-5">
                <p className="ml-5 mb-3 font-bold">아이 별명</p>
                <div className="flex justify-center">
                  <Input
                    isRequired
                    isClearable
                    label="아이 별명"
                    variant="bordered"
                    className="w-11/12"
                    radius={"sm"}
                    onValueChange={(name) => babyNameInput(index, name)}
                    value={baby.babyName}
                  ></Input>
                </div>
              </div>

              <div>
                <p className="ml-5 mb-3 font-bold">태어난 날 (출산 예정일)</p>
                <div className="flex justify-center">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="생년월일"
                      disableFuture={true}
                      onChange={(newDate: dayjs.Dayjs | null) => babyBirthInput(index, newDate)}
                      format="YYYY-MM-DD"
                      sx={{ width: "91%" }}
                    ></DatePicker>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          )}
          <hr className="mt-5 mb-5"></hr>
        </div>
      ))}
      <div className="flex justify-center items-center mt-10">
        <div className="flex items-center">
          {babyList.length < 5 && <span className="text-2xl font-bold">아이가 더 있어요</span>}
          {babyList.length < 5 && (
            <span onClick={addBabyInfo}>
              <BiPlusCircle className="text-4xl ml-0.5" />
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Button className="w-11/12 text-white bg-[#5E9FF2] ">회원 가입</Button>
      </div>
    </div>
  );
}
