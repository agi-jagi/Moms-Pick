"use client";

import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import Logout from "./Logout";

export default function InfoList() {
  const router = useRouter();
  return (
    <div
      style={{
        margin: "40px 20px 20px 20px",
        padding: "10px 20px",
        borderRadius: "15px",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="font-bold text-base">찜 목록</p>
        </div>
        <IoIosArrowForward size="30" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid grey",
          marginTop: "10px",
          paddingTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="font-bold text-base">구매 목록</p>
        </div>
        <IoIosArrowForward size="30" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid grey",
          marginTop: "10px",
          paddingTop: "10px",
        }}
        onClick={() => {
          router.push("/mypage/salelist");
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="font-bold text-base">판매 목록</p>
        </div>
        <IoIosArrowForward size="30" />
      </div>

      <Logout />
    </div>
  );
}
