import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EditBabyModalProps {
  open: boolean;
  onClose: () => void;
  babyInfo: any;
  handleUpdate: (updatedBaby: any) => void;
  handleDelete: () => void;
}

const UpdateBabyInfo: React.FC<EditBabyModalProps> = ({
  open,
  onClose,
  babyInfo,
  handleUpdate,
  handleDelete,
}) => {
  const [updateBaby, setUpdatedBaby] = useState<any>(babyInfo);

  useEffect(() => {
    setUpdatedBaby(babyInfo);
  }, [babyInfo]);

  const updateGender = (gender: string) => {
    setUpdatedBaby({ ...updateBaby, gender });
  };

  const updateName = (name: string) => {
    setUpdatedBaby({ ...updateBaby, name });
  };

  const updateBirth = (birth: dayjs.Dayjs | null) => {
    if (birth) {
      const formattedBirth = birth.format("YYYY-MM-DD");
      setUpdatedBaby({ ...updateBaby, birth: formattedBirth });
    }
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
        <p className="ml-6 mb-3 font-bold">성별</p>
        <div className="flex gap-8 justify-center items-center mb-5">
          <Button
            variant="bordered"
            style={{
              width: "30%",
              height: "100%",
              padding: "5%",
              backgroundColor: updateBaby.gender === "M" ? "#D0F0FD" : "transparent",
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
              backgroundColor: updateBaby.gender === "F" ? "#FDD0EF" : "transparent",
            }}
            onClick={() => updateGender("F")}
          >
            <Image src="/girl.png" alt="여자 아기" width={80} height={80}></Image>
          </Button>
        </div>
        <div className="ml-6 mb-5">
          <p className="mb-3 font-bold">아이 별명</p>
          <Input
            isRequired
            isClearable
            label="아이 별명"
            variant="bordered"
            className="w-11/12"
            radius={"sm"}
            onValueChange={(name) => updateName(name)}
            value={updateBaby.name}
          ></Input>
        </div>
        <div className="ml-6">
          <p className="mb-3 font-bold">태어난 날 (출산 예정일)</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="생년월일"
              disableFuture={true}
              onChange={(newDate: dayjs.Dayjs | null) => updateBirth(newDate)}
              format="YYYY-MM-DD"
              sx={{ width: "91%" }}
            ></DatePicker>
          </LocalizationProvider>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleDelete}
            className="mr-4 w-32"
            style={{ backgroundColor: "#F85D5D", color: "white" }}
          >
            삭제
          </Button>
          <Button
            onClick={saveChanges}
            className="w-32"
            style={{ backgroundColor: "#5E9FF2", color: "white" }}
          >
            저장
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default UpdateBabyInfo;
