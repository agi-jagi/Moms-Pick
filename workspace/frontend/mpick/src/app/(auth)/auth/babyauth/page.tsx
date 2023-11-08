"use client";

import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "../../../_config/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { Select, SelectItem } from "@nextui-org/react";
import { BiPlusCircle } from "react-icons/bi";
import Link from "next/link";

interface BabyInfo {
  babyName: string;
  babyBirth: string;
  babyGender: "M" | "F" | "";
  isFolded: boolean;
  babyOrder: number;
}

export default function BabyAuth() {
  const [babyList, setBabyList] = useState<BabyInfo[]>([
    { babyName: "", babyBirth: "", babyGender: "", babyOrder: 0, isFolded: false },
  ]);
  const router = useRouter();
  const babyOrder = { "첫 째": 1, "둘 째": 2, "셋 째": 3, "넷 째": 4, "다섯 째": 5 };
  console.log(babyList);

  const babyNameInput = (index: number, babyName: string) => {
    const newBaby = [...babyList];
    newBaby[index].babyName = babyName;
    setBabyList(newBaby);
  };

  const babyBirthInput = (index: number, babyBirth: dayjs.Dayjs | null) => {
    const newBaby = [...babyList];
    if (babyBirth) {
      newBaby[index].babyBirth = babyBirth.format("YYYY-MM-DD");
      setBabyList(newBaby);
    }
  };

  const genderSelected = (index: number, babyGender: "M" | "F") => {
    const newBaby = [...babyList];
    newBaby[index].babyGender = babyGender;
    setBabyList(newBaby);
  };

  const babyOrderSelected = (index: number, babyOrder: number) => {
    const newBaby = [...babyList];
    newBaby[index].babyOrder = babyOrder;
    setBabyList(newBaby);
  };

  const addBabyInfo = () => {
    setBabyList([
      ...babyList,
      { babyName: "", babyBirth: "", babyGender: "", babyOrder: 0, isFolded: false },
    ]);
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

  const registerBaby = async () => {
    for (let i = 0; i < babyList.length; i++) {
      const baby = babyList[i];

      if (baby.babyName && baby.babyBirth && baby.babyGender && baby.babyOrder) {
        const data = {
          babyName: baby.babyName,
          babyBirth: baby.babyBirth,
          babyGender: baby.babyGender,
          babyOrder: baby.babyOrder,
        };
        try {
          const response = await axios.post("/api/profiles/child", data);
          console.log(response.data, "아이 등록 성공");
          Toast.fire({
            icon: "success",
            title: "아이 정보가 등록되었습니다.",
          });
          router.push("/trade");
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("아이 정보를 모두 입력해 주세요.");
      }
    }
  };

  return (
    <div>
      {/* <h1 className="font-bold mb-4 text-center text-2xl">아이 정보 입력</h1> */}

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
                    backgroundColor: baby.babyGender === "M" ? "#D0F0FD" : "transparent",
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
                    backgroundColor: baby.babyGender === "F" ? "#FDD0EF" : "transparent",
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

              <div className="mb-5">
                <p className="ml-5 mb-3 font-bold">태어난 날 (출산 예정일)</p>
                <div className="mb-3 flex justify-center">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="생년월일"
                      onChange={(newDate: dayjs.Dayjs | null) => babyBirthInput(index, newDate)}
                      format="YYYY-MM-DD"
                      sx={{ width: "91%" }}
                    ></DatePicker>
                  </LocalizationProvider>
                </div>
              </div>
              <p className="ml-5 mb-3 font-bold">아이 순서</p>
              <div className="flex justify-center ">
                <Select label="몇 째인가요?" variant="bordered" className="w-11/12 ">
                  {Object.entries(babyOrder).map(([label, order]) => (
                    <SelectItem key={order} onClick={() => babyOrderSelected(index, order)}>
                      {label}
                    </SelectItem>
                  ))}
                </Select>
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

      <div className="flex justify-center mt-8 gap-6 " style={{ zIndex: "14" }}>
        <Link href="/trade">
          <Button className="text-white bg-[#5E9FF2] ">건너뛰기</Button>
        </Link>
        <Button className=" text-white bg-[#5E9FF2]" onClick={registerBaby}>
          등록하기
        </Button>
      </div>
    </div>
  );
}
