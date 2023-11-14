import { useParentingStore } from "@/store/ParentingStore";
import instance from "@/app/_config/axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

interface DetailModalProps {
  meal: any;
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const DetailModal: React.FC<DetailModalProps> = ({ open, onClose }) => {
  const { foodId } = useParentingStore();
  const [detailFoodInfo, setDetailFoodInfo] = useState<any>("");
  const cookMethod = detailFoodInfo.cookMethod;

  useEffect(() => {
    const getDetailFoodInfo = async () => {
      try {
        const response = await instance.get(`/api/info/babymeal/${foodId}`);
        setDetailFoodInfo(response.data.response);
        console.log("디테일 정보 조회 성공", response.data.response);
      } catch (error) {
        console.log("디테일 정보 조회 실패", error);
      }
    };

    if (open) {
      getDetailFoodInfo();
    }
  }, [open, foodId]);

  console.log("디테일 정보", detailFoodInfo);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <p>{detailFoodInfo.mealName}</p>
        <p>요리 방법: {detailFoodInfo.cookMethod}</p>
        <p>재료: {detailFoodInfo.materialName}</p>
        <p>탄수화물: {detailFoodInfo.carbohydrates}</p>
        <p>단백질: {detailFoodInfo.protein}</p>
        <p>지방: {detailFoodInfo.fat}</p>
        <p>나트륨: {detailFoodInfo.sodium}</p>
        <p>칼슘: {detailFoodInfo.calcium}</p>
        <p>철: {detailFoodInfo.fe}</p>
        <p>칼로리: {detailFoodInfo.calorie}</p>

        <div className="flex justify-center mt-10">
          <Button onClick={onClose}>확인</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DetailModal;
