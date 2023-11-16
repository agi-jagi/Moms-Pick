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
import { FaAngleRight } from "react-icons/fa";

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
    try {
      const response = await instance.get("/api/info/babymeal", {
        params: {
          subMealCategory: foodCategory,
          page: page,
        },
      });
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
      <Box sx={{ width: "100%", bgcolor: "background.paper", marginBottom: "15px" }}>
        <Tabs value={foodCategory} onChange={handleChange} centered>
          {selectedCategory.map((category, index) => (
            <Tab
              label={category}
              value={category}
              key={index}
              className="font-bold text-base"
            ></Tab>
          ))}
        </Tabs>
      </Box>
      {/* <Table isStriped aria-label="Example static collection table">
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
      </Table> */}

      {mealInfo.map((kind, index) => (
        <div key={index}>
          <div
            className="flex justify-between items-center"
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "8px",
              borderRadius: "15px",
            }}
            onClick={() => {
              selectedFoodId(kind.id);
              handleModalOpen(kind);
            }}
          >
            <p className="font-bold text-lg mt-1 mb-1 ml-5">{kind.mealName}</p>

            <FaAngleRight className="text-2xl mr-5" />
          </div>
        </div>
      ))}

      {selectedFood && (
        <DetailModal
          meal={selectedFood}
          open={isModalOpen}
          onClose={handleModalClose}
        ></DetailModal>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          count={maxPage}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
