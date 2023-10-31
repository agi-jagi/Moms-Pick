"use client";
import { useMonthStore } from "@/store/MonthStore";
import { useEffect } from "react";
import { NewBornNursing, NewBornExcretion } from "./(component)/NewBorn";
import OneToThreeNursing from "./(component)/OneToTree";

export default function MonthInfo() {
  const { month, article, setMonth, setArticle } = useMonthStore();

  // 컴포넌트가 마운트될 때 localSotrage에서 month 값을 가져옴
  useEffect(() => {
    const savedMonth = localStorage.getItem("selectedMonth");
    if (savedMonth) {
      setMonth(savedMonth);
    }
    setArticle("수유 용품");
  }, [setArticle, setMonth]);

  // month 값이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("selectedMonth", month);
  }, [month]);

  return (
    <div>
      <h1>{month}</h1>
      <h1>{article}</h1>
      <br></br>
      {month === "신생아" && article === "수유 용품" && <NewBornNursing />}
      {month === "신생아" && article === "기저귀" && <NewBornExcretion />}
      {month === "1~3개월" && article === "수유 용품" && <OneToThreeNursing />}
    </div>
  );
}
