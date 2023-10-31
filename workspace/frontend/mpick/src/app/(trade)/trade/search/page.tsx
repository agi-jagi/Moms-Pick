'use client';

import { useTradeStore } from "@/store/TradeStore";
import { useEffect, useState } from "react";
import { Chip, Card, CardFooter, Image, CardBody, Button } from "@nextui-org/react";
import FilterIcon from "./FilterIcon";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";


export default function Search() {

  const list = [
    {
      title: "목욕용품",
      img: "/nezko.jfif",
      price: "₩ 20,000",
    },
    {
      title: "수유용품",
      img: "/nezko.jfif",
      price: "₩ 300,000",
    },
    {
      title: "이유용품",
      img: "/nezko.jfif",
      price: "₩ 100,000",
    },
    {
      title: "기저귀",
      img: "/nezko.jfif",
      price: "₩ 53,000",
    },
    {
      title: "유모차",
      img: "/nezko.jfif",
      price: "₩ 157,000",
    },
    {
      title: "외출용품",
      img: "/nezko.jfif",
      price: "₩ 80,000",
    },
    {
      title: "의류",
      img: "/nezko.jfif",
      price: "₩ 75,000",
    },
    {
      title: "임산부",
      img: "/nezko.jfif",
      price: "₩ 122,000",
    },
  ];



  return (
    <>
      <div>
      <div className="flex gap-4 mt-4 justify-center">
      <Chip
        startContent={<FilterIcon />}
        variant="faded"
        color="default"
        endContent={<BsChevronDown className="mr-1"/>}
        className="shadow-md"
      >
        대분류
      </Chip>
      <Chip
        startContent={<FilterIcon />}
        variant="faded"
        color="default"
        endContent={<BsChevronDown className="mr-1"/>}
        className="shadow-md"
      >
        중분류
      </Chip>
      <Chip
        startContent={<FilterIcon />}
        variant="faded"
        color="default"
        endContent={<BsChevronDown className="mr-1"/>}
        className="shadow-md"
      >
        개월수
      </Chip>
      </div>
      <div className="flex justify-between items-center w-full mt-2">
        <div className="relative w-[172px] h-[40px]">
          <div className="absolute w-[161px] h-[21px] mt-1 top-5 left-5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#1f1f1f] text-[18px] tracking-[-0.60px] leading-[24px] whitespace-nowrap">
            검색 결과
          </div>
        </div>
        <Button 
          startContent={<BiSolidMessageSquareAdd />}
          radius="full" 
          className="top-3 right-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg"
        >
          판매글 등록
        </Button>
      </div>
    </div>
    <div className="mt-5 gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
    </>
  )
}