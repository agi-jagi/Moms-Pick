'use client';
import { Button, Input, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import {SearchIcon} from "./searchIcon";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTradeStore } from "@/store/TradeStore";

import Radius from "./radius";

export default function TopNavBar() {

  const [ 반경open, set반경Open ] = useState(false);
  const handleOpen반경 = () => set반경Open(!반경open);

  const [ nowAddress, setNowAddress ] = useState<string>("");

  const { distance } = useTradeStore();

  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");

  const { storeLatitude, setStoreLatitude , storeLongitude, setStoreLongitude } = useTradeStore();

  useEffect(() => {

    async function getAddress() {
      try {
        const res = await axios.get(`/api/users/addresses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(res.data.response)
        for (let i = 0; res.data.response.length; i++) {
          if (res.data.response[i].isSet) {
            setLatitude(res.data.response[i].latitude);
            setStoreLatitude(res.data.response[i].latitude);
            setLongitude(res.data.response[i].longitude);
            setStoreLongitude(res.data.response[i].longitude);
            setNowAddress(res.data.response[i].addressName);
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    getAddress();
  }, []);

  return (
    <div>
    <div className="flex items-center gap-4 ml-4 mt-4">
      <div className="w-[84px] h-[42px]">
        <div className="relative w-[94px] h-[94px] top-[-20px] left-[-10px]" onClick={() => handleOpen반경()}>
          <div className="absolute h-[19px] top-[33px] left-[46px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#212124] text-[14px] tracking-[0] leading-[18.9px] whitespace-nowrap">
            {nowAddress}
          </div>
          <img className="absolute w-[79px] h-[94px] top-0 left-0" alt="Pin" src="/pin.svg" />
          <div className="absolute w-[84px] h-[42px] top-[20px] left-[10px]" />
        </div>
      </div>
      <div className="w-[260px] h-[50px] px-1 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-blue-200 via-green-100 to-cyan-200 text-black shadow-lg">
        <Link href={"/trade/search"}>
        <Input
          label=""
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/70 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
            ],
          }}
          startContent={
            <SearchIcon />
          }
          placeholder="검색 페이지로 이동"
        />
        </Link>
      </div>
    </div>
    <Modal isOpen={반경open} onOpenChange={handleOpen반경}>
            <ModalContent>
              {() => (
                <>
                  
                    <ModalHeader className="flex flex-col gap-1 [text-shadow:0px_4px_4px_#00000040] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold">반경 설정
                    : {distance}</ModalHeader>
                    <ModalBody>
                    < Radius />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="bg-[#5E9FF2] text-white"
                        type="submit"
                        onClick={handleOpen반경}
                      >
                        설정하기
                      </Button>
                    </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
    
    </div>
  )
}