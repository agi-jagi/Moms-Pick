"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useMonthStore } from "@/store/MonthStore";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export default function MonthInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const { article, setArticle } = useMonthStore();

  return (
    <>
      <Dropdown>
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
      </Dropdown>
      {children}
    </>
  );
}
