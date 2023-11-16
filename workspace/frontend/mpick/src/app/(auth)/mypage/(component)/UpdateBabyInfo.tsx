import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { AiOutlineClose } from "react-icons/ai";
import { Select, SelectItem } from "@nextui-org/react";

const style = {
  position: "absolute",
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

interface UpdateBabyModalProps {
  open: boolean;
  onClose: () => void;
  selectedBaby: any;
  handleUpdate: (updatedBaby: any) => void;
  handleDelete: () => void;
}

const UpdateBabyInfo: React.FC<UpdateBabyModalProps> = ({
  open,
  onClose,
  selectedBaby,
  handleUpdate,
  handleDelete,
}) => {
  const [updateBaby, setUpdatedBaby] = useState<any>(selectedBaby);
  const babyOrder = { "첫 째": 1, "둘 째": 2, "셋 째": 3, "넷 째": 4, "다섯 째": 5 };

  useEffect(() => {
    setUpdatedBaby(selectedBaby);
  }, [selectedBaby]);

  const updateGender = (babyGender: string) => {
    setUpdatedBaby({ ...updateBaby, babyGender });
  };

  const updateName = (babyName: string) => {
    setUpdatedBaby({ ...updateBaby, babyName });
  };

  const updateBirth = (babyBirth: dayjs.Dayjs | null) => {
    if (babyBirth) {
      const formattedBirth = babyBirth.format("YYYY-MM-DD");
      setUpdatedBaby({ ...updateBaby, babyBirth: formattedBirth });
    }
  };

  const updateOrder = (babyOrder: number) => {
    setUpdatedBaby({ ...updateBaby, babyOrder });
  };

  const saveChanges = () => {
    handleUpdate(updateBaby);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="flex justify-end mb-3" onClick={onClose}>
          <AiOutlineClose style={{ fontSize: "180%" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <p className="font-bold text-2xl mb-4">아이 정보 수정</p>
        </div>
        <p className="ml-1 mb-1 font-bold">성별</p>
        <div className="flex gap-8 justify-center items-center mb-5">
          <Button
            variant="bordered"
            style={{
              width: "30%",
              height: "100%",
              padding: "5%",
              backgroundColor: updateBaby.babyGender === "M" ? "#D0F0FD" : "transparent",
            }}
            onClick={() => updateGender("M")}
          >
            <Image src="/boy.png" alt="남자 아기" width={80} height={80}></Image>
          </Button>
          <Button
            variant="bordered"
            style={{
              width: "30%",
              height: "100%",
              padding: "5%",
              backgroundColor: updateBaby.babyGender === "F" ? "#FDD0EF" : "transparent",
            }}
            onClick={() => updateGender("F")}
          >
            <Image src="/girl.png" alt="여자 아기" width={80} height={80}></Image>
          </Button>
        </div>
        <div className="mb-3">
          <p className="ml-1 mb-1 font-bold">아이 별명</p>
          <div className="flex justify-center">
            <Input
              isClearable
              label="아이 별명"
              variant="bordered"
              className="w-full"
              radius={"sm"}
              onValueChange={(babyName) => updateName(babyName)}
              value={updateBaby.babyName}
            ></Input>
          </div>
        </div>
        <div className="mb-3">
          <p className="ml-1 mb-2 font-bold">태어난 날 (출산 예정일)</p>
          <div className="flex justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="생년월일"
                value={updateBaby.babyBirth ? dayjs(updateBaby.babyBirth) : null}
                onChange={(newDate: dayjs.Dayjs | null) => updateBirth(newDate)}
                format="YYYY-MM-DD"
                sx={{ width: "100%" }}
              ></DatePicker>
            </LocalizationProvider>
          </div>
        </div>
        <p className="ml-1 mb-1 font-bold">아이 순서</p>
        <div className="flex justify-center ">
          <Select label="몇 째인가요?" variant="bordered" className="w-full">
            {Object.entries(babyOrder).map(([label, order]) => (
              <SelectItem key={order} onClick={() => updateOrder(order)}>
                {label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={handleDelete} className="mr-4 w-1/2 bg-[#F85D5D] text-white">
            삭제
          </Button>
          <Button onClick={saveChanges} className="w-1/2 bg-[#5E9FF2] text-white">
            저장
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateBabyInfo;
