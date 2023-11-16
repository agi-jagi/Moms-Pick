"use client";

import { useState, useEffect } from "react";
import GoBack from "../../auth/GoBack";
import instance from "@/app/_config/axios";
import { Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

export default function SaleList() {
  const router = useRouter();
  const [saleList, setSaleList] = useState<any>([]);

  useEffect(() => {
    instance
      .get(`/api/users/sale-list`)
      .then((res) => {
        setSaleList(res.data.response);
      })
      .catch((err) => {});
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
      {saleList.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <p className="text-semibold">판매기록이 없습니다</p>
        </div>
      ) : (
        <div>
          {saleList.map((info: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  router.push(`/trade/detail/${info.tradeId}`);
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p className="text-red-600 text-xl font-bold mb-3">{info.tradeStatus}</p>
                    <div className="flex gap-5">
                      <Image src={info.thumbNailImage} alt="물건사진" width={100} height={100} />
                      <div>
                        <p>{info.nickname}</p>
                        <p className="font-bold text-lg mt-2">{info.title}</p>
                        <p className="font-bold text-lg mt-2">{info.price}원</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaAngleRight className="text-3xl" />
                  </div>
                </div>
                <hr style={{ borderTopWidth: "2px", margin: "10px 0" }} />
              </div>
            );
          })}
        </div>
      )}

      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
