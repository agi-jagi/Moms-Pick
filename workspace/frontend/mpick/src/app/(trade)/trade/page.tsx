'use client';

import useStore from "../../../store/useStore";
import { useTradeStore } from "@/store/TradeStore";
import { Button, Card, CardFooter, CardHeader, CardBody, Image, Avatar, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {SearchIcon} from "./searchIcon";


export default function Trade() {

  const [ isClient, setIsClient ] = useState(false);
  const { postId, setPostId, postTitle, setPostTitle } = useTradeStore();

  const list = [
    {
      title: "목욕용품",
      img: "/nezko.jfif",
      price: "$5.50",
    },
    {
      title: "수유용품",
      img: "/nezko.jfif",
      price: "$3.00",
    },
    {
      title: "이유용품",
      img: "/nezko.jfif",
      price: "$10.00",
    },
    {
      title: "기저귀",
      img: "/nezko.jfif",
      price: "$5.30",
    },
    {
      title: "유모차",
      img: "/nezko.jfif",
      price: "$15.70",
    },
    {
      title: "외출용품",
      img: "/nezko.jfif",
      price: "$8.00",
    },
    {
      title: "의류",
      img: "/nezko.jfif",
      price: "$7.50",
    },
    {
      title: "임산부",
      img: "/nezko.jfif",
      price: "$12.20",
    },
  ];

  useEffect(() => {
    console.log(postId);

    if (typeof window !== 'undefined' && window.document) {
      setIsClient(true);
    }

  },[]);

  

  return (
    <>
    {
      isClient === true ? (
        <>
        <div>
      Trade 페이지
      <br />
      {postId}
      <br />
      {postTitle}
      <br />
      {/* <Button onClick={() => setPostId(30)}>postId 변경</Button> */}
      </div>
      {/* <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="/nezko.jfif"
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Available soon.</p>
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
          Notify me
        </Button>
      </CardFooter>
    </Card> */}
    {/* <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/nezko.jfif"
          width={270}
        />
      </CardBody>
    </Card> */}
    <div className="flex gap-4 items-center">
      <Avatar isBordered color="default" src="/nezko.jfif" />
      <Avatar isBordered color="primary" src="/nezko.jfif" />
      <Avatar isBordered color="secondary" src="/nezko.jfif" />
      <Avatar isBordered color="success" src="/nezko.jfif" />
      <Avatar isBordered color="warning" src="/nezko.jfif" />
      <Avatar isBordered color="danger" src="/nezko.jfif" />
    </div>
    {/* <div className="w-[240px] h-[60px] px-1 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg">
     */}
    <div className="flex items-center gap-4 ml-4">
      <div className="w-[84px] h-[42px]">
        <div className="relative w-[94px] h-[94px] top-[-20px] left-[-10px]">
          <div className="absolute h-[19px] top-[33px] left-[46px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#212124] text-[14px] tracking-[0] leading-[18.9px] whitespace-nowrap">
            탄지로
          </div>
          <img className="absolute w-[79px] h-[94px] top-0 left-0" alt="Pin" src="/pin.svg" />
          <div className="absolute w-[84px] h-[42px] top-[20px] left-[10px]" />
        </div>
      </div>
      <div className="w-[260px] h-[50px] px-1 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-blue-200 via-green-100 to-cyan-200 text-black shadow-lg">
        <Input
          label=""
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="검색어 입력"
          startContent={
            <SearchIcon />
          }
        />
      </div>
    </div>
    {/* <Input
      isClearable
      type="search"
      label="Search"
      variant="bordered"
      placeholder="검색어 입력"
      defaultValue="호윤"
      onClear={() => console.log("input cleared")}
      className="max-w-[240px]"
    /> */}
    <div className="mt-2 gap-2 grid grid-cols-2 sm:grid-cols-4">
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
      ) : (
        <>
        아직 서버
        </>
      )
    }
    </>
  );
}
