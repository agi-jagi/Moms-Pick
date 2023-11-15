"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import instance from "@/app/_config/axios";
import Pagination from "@mui/material/Pagination";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useParentingStore } from "@/store/ParentingStore";
import DetailModal from "./MealDetail";

export interface BaybMealInfo {
  id: number;
  mealName: string;
}

export default function Meal() {
  const selectedCategory = ["미음", "죽", "밥", "기타"];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [mealInfo, setMealInfo] = useState<BaybMealInfo[]>([{ id: 0, mealName: "" }]);
  const [foodCategory, setFoodCategory] = useState<string>("");
  const { foodId, setFoodId } = useParentingStore();
  const [selectedFood, setSelectedFood] = useState<BaybMealInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = (meal: BaybMealInfo) => {
    setSelectedFood(meal);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newFood: string) => {
    setFoodCategory(newFood);
    setCurrentPage(1);
    getKindFood(newFood, 1);
  };

  const handlePageChange = (event: React.SyntheticEvent<unknown>, page: number) => {
    setCurrentPage(page);
    getKindFood(foodCategory, page);
  };

  console.log("페이지", currentPage);

  const getKindFood = async (foodCategory: string, page: number) => {
    const data = {
      subMealCategory: foodCategory,
      page: page,
    };
    try {
      const response = await instance.post("/api/info/babymeal", data);
      console.log("음식 종류 조회 성공", response.data.response);
      const mealInfo: BaybMealInfo[] = response.data.response.babyMealInfoDtoList.map(
        (meal: BaybMealInfo) => ({
          id: meal.id,
          mealName: meal.mealName,
        })
      );
      setMealInfo(mealInfo);
      setMaxPage(response.data.response.maxPage);
    } catch (error) {
      console.log("음식 종류 조회 실패", error);
    }
  };

  console.log("전체 정보", mealInfo);

  useEffect(() => {
    setFoodCategory("미음");
    getKindFood("미음", 1);
  }, []);

  console.log("선택한 종류", foodCategory);

  const selectedFoodId = (id: number) => {
    setFoodId(id);
  };
  console.log("선택한 아이디", foodId);

  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={foodCategory} onChange={handleChange} centered>
          {selectedCategory.map((category, index) => (
            <Tab label={category} value={category} key={index}></Tab>
          ))}
        </Tabs>
      </Box>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn className="text-center font-bold text-base">이름</TableColumn>
          <TableColumn className="text-center font-bold text-base">보기</TableColumn>
        </TableHeader>
        <TableBody>
          {mealInfo.map((kind, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{kind.mealName}</TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => {
                    selectedFoodId(kind.id);
                    handleModalOpen(kind);
                  }}
                  className="bg-[#5E9FF2] text-white"
                >
                  상세보기
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedFood && (
        <DetailModal
          meal={selectedFood}
          open={isModalOpen}
          onClose={handleModalClose}
        ></DetailModal>
      )}

      <div className="flex justify-center mt-10">
        <Pagination
          count={maxPage}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
}
