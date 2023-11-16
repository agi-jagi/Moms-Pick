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
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const DetailModal: React.FC<DetailModalProps> = ({ open, onClose }) => {
  const { foodId } = useParentingStore();
  const [detailFoodInfo, setDetailFoodInfo] = useState<any>("");
  const [cookMethod, setCookMethod] = useState<string[]>([]);

  useEffect(() => {
    const getDetailFoodInfo = async () => {
      try {
        const response = await instance.get(`/api/info/babymeal/${foodId}`);
        setDetailFoodInfo(response.data.response);
        setCookMethod(response.data.response.cookMethod);
        console.log("디테일 정보 조회 성공", response.data.response);
      } catch (error) {
        console.log("디테일 정보 조회 실패", error);
      }
    };

    if (open) {
      getDetailFoodInfo();
    }
  }, [open, foodId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <p className="flex justify-center font-bold text-2xl mb-6">[ {detailFoodInfo.mealName} ]</p>
        <p className="flex justify-end font-bold mb-3">{detailFoodInfo.calorie}kcal</p>
        <p className="font-bold mb-1">Ⅰ. 요리 방법</p>
        {cookMethod.map((method: string, index: number) => (
          <div key={index}>
            <p>{method}</p>
          </div>
        ))}
        <p className="font-bold mt-5 mb-1">Ⅱ. 재료 </p>
        <p> {detailFoodInfo.materialName}</p>
        <p className="font-bold mt-5 mb-1">Ⅲ. 영양성분</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p>탄수화물</p>
            <p>{detailFoodInfo.carbohydrates}</p>
          </div>
          <div className="text-center">
            <p>단백질</p>
            <p>{detailFoodInfo.protein}</p>
          </div>
          <div className="text-center">
            <p>지방</p>
            <p>{detailFoodInfo.fat}</p>
          </div>
          <div className="text-center">
            <p>나트륨</p>
            <p>{detailFoodInfo.sodium}</p>
          </div>
          <div className="text-center">
            <p>칼슘</p>
            <p>{detailFoodInfo.calcium}</p>
          </div>
          <div className="text-center">
            <p>철</p>
            <p>{detailFoodInfo.fe}</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button onClick={onClose} className="w-full bg-[#5E9FF2] text-white">
            확인
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DetailModal;
