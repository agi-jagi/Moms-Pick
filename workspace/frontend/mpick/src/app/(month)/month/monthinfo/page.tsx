"use client";
import { useMonthStore } from "@/store/MonthStore";
import { useEffect } from "react";

export default function MonthInfo() {
  const { month, article, setArticle } = useMonthStore();

  useEffect(() => {
    setArticle("수유 용품");
  }, []);

  return (
    <div>
      <h1>{month}</h1>
      <h1>{article}</h1>
    </div>
  );
}
