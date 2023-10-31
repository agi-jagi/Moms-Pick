"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useMonthStore } from "@/store/MonthStore";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
// import { Select, SelectItem } from "@nextui-org/react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import GoBack from "../../../(auth)/auth/goback";

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

  const { month, article, setArticle } = useMonthStore();

  const handleChange = (event: SelectChangeEvent) => {
    setArticle(event.target.value as string);
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
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">용품 선택</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={article}
            label="용품 선택"
            onChange={handleChange}
          >
            {articleList.map((article, index) => (
              <MenuItem key={index} value={article}>
                {article}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* <Select label="용품 선택" defaultSelectedKeys={["수유 용품"]} size={"sm"}>
        {articleList.map((article: string, index: number) => (
          <SelectItem key={index} onClick={() => setArticle(article)}>
            {article}
          </SelectItem>
        ))}
      </Select> */}
      {/* <Dropdown>
        <DropdownTrigger>
          <Button
            variant="solid"
            style={{ backgroundColor: "#5E9FF2", color: "white" }}
          >
            {article}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {articleList.map((article: string, index: number) => (
            <DropdownItem key={index} onClick={() => setArticle(article)}>
              {article}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown> */}
      {children}
    </>
  );
}
