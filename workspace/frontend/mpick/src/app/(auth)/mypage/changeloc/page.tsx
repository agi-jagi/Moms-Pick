"use client";

import { useState, useEffect } from "react";
import GoBack from "../../auth/GoBack";
import Map from "./map";
import Image from "next/image";
import search from "../../../../../public/search.png";
import instance from "@/app/_config/axios";
import { useDaumPostcodePopup } from "react-daum-postcode";
import marker from "../../../../../public/marker.png";

export default function EditMyInfo() {
  const [searchingAddress, setSearchingAddress] = useState<string>("");
  const [addressBname, setAddressBname] = useState<string>("");
  const [addressList, setAddressList] = useState<any>([]);
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const [chooseAddress, setChooseAddress] = useState<string>("");

  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const searchAddress = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    setAddressBname(data.bname);

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
    setSearchingAddress(data.address);
  };

  const selectAddress = (address: any) => {
    setLatitude(address.latitude);
    setLongitude(address.longitude);
    let dummy = addressList;
    for (let i = 0; i < dummy.length; i++) {
      if (dummy[i].addressId === address.addressId) {
        dummy[i].isSet = true;
        setChooseAddress(address.addressString);
      } else {
        dummy[i].isSet = false;
      }
    }
    instance.post(`/api/users/addresses/${address.addressId}`).then((res) => {});
    setAddressList(dummy);
  };

  const selectedAddress = (address: any) => {
    for (let i = 0; i < address.length; i++) {
      if (address[i].isSet) {
        setLatitude(address[i].latitude);
        setLongitude(address[i].longitude);
        setChooseAddress(address[i].addressString);
      }
    }
  };

  const getAddressList = async () => {
    await instance
      .get("/api/users/addresses")
      .then((res) => {
        setAddressList(res.data.response);
      })
      .catch((err) => {});
  };

  let count = 0;
  const addAddressList = async () => {
    const addressData = {
      latitude: latitude,
      longitude: longitude,
      addressName: addressBname,
      addressString: searchingAddress,
      isSet: true,
    };
    if (count === 1) {
      count--;
      await instance
        .post("/api/users/addresses", addressData)
        .then((res) => {
          getAddressList();
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (isAddressSearch) {
      setIsAddressSearch(false);
      count++;
      addAddressList();
    }
  }, [isAddressSearch]);

  useEffect(() => {
    if (addressList.length != 0) {
      selectedAddress(addressList);
    }
  }, [addressList]);

  useEffect(() => {
    getAddressList();
  }, []);

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
            <Image src={search} alt="search" width={30} height={30} />
          </div>
        </div>
        <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
      </div>
      {longitude ? (
        <Map
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          searchingAddress={searchingAddress}
          setIsAddressSearch={setIsAddressSearch}
          chooseAddress={chooseAddress}
        />
      ) : (
        <></>
      )}
      <div style={{ marginTop: "20px", padding: "0 10px" }}>
        {addressList.map((address: any, index: number) => {
          return (
            <div
              key={index}
              style={{ marginBottom: "10px" }}
              onClick={() => {
                selectAddress(address);
              }}
            >
              <div style={{ display: "flex", justifyContent: "start" }}>
                {address.isSet ? (
                  <Image src={marker} alt="marker" width={15} height={15} />
                ) : (
                  <div style={{ width: "15px", height: "15px", backgroundColor: "white" }}></div>
                )}
                <p className="text-xl" style={{ marginLeft: "5px" }}>
                  {address.addressString}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
