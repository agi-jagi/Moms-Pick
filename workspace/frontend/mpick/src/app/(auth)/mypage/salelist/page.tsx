"use client";

import { useState, useEffect } from "react";
import GoBack from "../../auth/GoBack";
import instance from "@/app/_config/axios";
import { Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SaleList() {
  const router = useRouter();
  const [saleList, setSaleList] = useState<any>([]);

  useEffect(() => {
    instance
      .get(`/api/users/sale-list`)
      .then((res) => {
        console.log(res.data.response);
        setSaleList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          margin: "20px 30px",
        }}
      >
        <GoBack />
        <div className="flex justify-center">
          <p className="font-bold text-3xl">판매목록</p>
        </div>
      </div>
      <hr style={{ borderTopWidth: "2px", margin: "10px 0" }} />
      {saleList.map((info: any, index: number) => {
        return (
          <div key={index} style={{ display: "flex" }}>
            <Image src={info.thumbNailImage} alt="물건사진" width={50} height={50} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginLeft: "10px",
              }}
            >
              <div>
                <p>{info.title}</p>
                <p>{info.price}</p>
                <p>{info.tradeStatus}</p>
              </div>
              <Button
                onClick={() => {
                  router.push(`/trade/detail/${info.tradeId}`);
                }}
                style={{ backgroundColor: "#5E9FF2" }}
              >
                <p className="text-base">상세보기</p>
              </Button>
            </div>
          </div>
        );
      })}

      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
