"use client";

import { useState, useEffect } from "react";
import GoBack from "../../auth/GoBack";
import Map from "./map";
import Image from "next/image";
import search from "../../../../../public/search.png";
import instance from "@/app/_config/axios";
import { useDaumPostcodePopup } from "react-daum-postcode";

export default function EditMyInfo() {
  const [searchingAddress, setSearchingAddress] = useState<string>("");

  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const searchAddress = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    const { addressType, bname, buildingName } = data;
    if (addressType === "R") {
      if (bname !== "") {
        extraAddress += bname;
      }
      if (buildingName !== "") {
        extraAddress += `${extraAddress !== "" && ", "}${buildingName}`;
      }
      fullAddress += `${extraAddress !== "" ? ` ${extraAddress}` : ""}`;
    }
    setSearchingAddress(fullAddress);
  };

  useEffect(() => {
    instance
      .get("/api/users/addresses")
      .then((res) => {
        console.log(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(searchingAddress);
  }, [searchingAddress]);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 20px 0 30px",
          }}
        >
          <GoBack />
          <div className="flex justify-center">
            <p className="font-bold text-3xl">위치 변경</p>
          </div>
          <div
            onClick={() => {
              searchAddress();
            }}
          >
            <Image src={search} alt="marker" width={30} height={30} />
          </div>
        </div>
        <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
      </div>
      <Map />
    </div>
  );
}
