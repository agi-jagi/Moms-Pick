"use client";

import Provider from "./Provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToekn");
    if (token) {
      router.push("/trade");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Provider>홈페이지</Provider>
    </div>
  );
}
