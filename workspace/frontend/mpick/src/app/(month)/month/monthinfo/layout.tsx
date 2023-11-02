"use client";
import React from "react";
import { useMonthStore } from "@/store/MonthStore";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
// import { Select, SelectItem } from "@nextui-org/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import GoBack from "../../../(auth)/auth/GoBack";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function MonthInfoLayout({ children }: { children: React.ReactNode }) {
  const articleList: string[] = [
    "수유 용품",
    "이유 용품",
    "외출",
    "유모차",
    "장난감",
    "의류",
    "기저귀",
    "임산부",
    "목욕 용품",
    "기타",
  ];

  const monthList: string[] = [
    "임산부",
    "신생아",
    "1~3개월",
    "4~6개월",
    "7~9개월",
    "10~12개월",
    "13~24개월",
    "25~36개월",
    "36개월~",
  ];

  const { month, article, setMonth, setArticle } = useMonthStore();
  const [state, setState] = useState({ bottom: false });

  const toggleDrawer = (open: boolean) => () => {
    setState({ ...state, bottom: open });
  };

  const articleChange = (event: SelectChangeEvent) => {
    setArticle(event.target.value as string);
  };

  const monthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  return (
    <>
      <div>
        <div style={{ margin: "20px 30px" }}>
          <GoBack />
          <div className="flex justify-center">
            <p className="font-bold text-3xl">{month} 정보</p>
          </div>
          <hr style={{ borderTopWidth: "2px", marginTop: "10px" }}></hr>
        </div>
      </div>

      <div className="flex justify-between px-4">
        <Box sx={{ width: "48%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">월령 선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              label="월령 선택"
              onChange={monthChange}
            >
              {monthList.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "48%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={article}
              label="카테고리"
              onChange={articleChange}
            >
              {articleList.map((article, index) => (
                <MenuItem key={index} value={article}>
                  {article}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      {children}
    </>
  );
}
