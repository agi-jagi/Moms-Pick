'use client';

import useStore from "../../../store/useStore";
import { useTradeStore } from "@/store/TradeStore";
import { Button, Card, CardFooter, CardHeader, CardBody, Image, Avatar, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {SearchIcon} from "./searchIcon";

// 대분류 카테고리 클릭 시 해당 대분류 id를 가지고 필터링 페이지로 !
// 대분류 카테고리 컴포넌트 분리 필요
// 반경 설정 컴포넌트 분리 필요
// 검색창 컴포넌트 분리 필요
// 상단 배너 넣어야 함
// SWIPE 적용해야 함
// 목록 보여주는 건 컴포넌트로 분리할지 고민중
// 


export default function Trade() {

  const [ isClient, setIsClient ] = useState(false);
  const { postId, setPostId, postTitle, setPostTitle } = useTradeStore();

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
        {/* <div>
      {postId}
      <br />
      {postTitle}
      <br />
      <Button onClick={() => setPostId(30)}>postId 변경</Button>
      </div> */}
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
    {/* 프로필  */}
    <div>
    <div className="flex gap-4 ml-4 items-center mb-4 mt-4">
      <Avatar isBordered color="default" src="/nezko.jfif" />
      <Avatar isBordered color="primary" src="/nezko.jfif" />
      <Avatar isBordered color="secondary" src="/nezko.jfif" />
      <Avatar isBordered color="success" src="/nezko.jfif" />
      <Avatar isBordered color="warning" src="/nezko.jfif" />
      <Avatar isBordered color="danger" src="/nezko.jfif" />
    </div>
    {/* <div className="w-[240px] h-[60px] px-1 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg">
     */}
     {/* 상단바 - 반경 설정 & 검색어 입력 */}
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
    <img className="mt-4" src="rengoku.gif" alt="" />
    {/* 대분류 카테고리 */}
    <div className="w-[390px] h-[128px] mt-4">
      <div className="relative h-[128px]">
        <img
          className="absolute w-[34px] h-[34px] top-[6px] left-[178px] object-cover"
          alt="Image"
          src="/이유용품.png"
        />
        <div className="absolute w-[390px] h-[128px] top-0 left-0">
          <div className="top-[6px] left-[10px] absolute w-[62px] h-[54px]">
            <div className="absolute w-[34px] h-[34px] top-0 left-[14px] bg-white">
              <div className="h-[34px]" />
            </div>
            <div className="absolute w-[38px] h-[14px] top-[40px] left-[12px] overflow-hidden">
              <div className="w-[38px] -top-px absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                유모차
              </div>
            </div>
          </div>
          <div className="top-[68px] left-[10px] absolute w-[62px] h-[54px]">
            <div className="relative w-[44px] h-[14px] top-[40px] left-[10px] overflow-hidden">
              <div className="w-[44px] -top-px absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                외출용품
              </div>
            </div>
          </div>
          <div className="top-[6px] left-[87px] absolute w-[62px] h-[54px]">
            <div className="relative w-[61px] h-[14px] top-[40px] left-px overflow-hidden">
              <div className="w-[61px] -top-px absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                수유용품
              </div>
            </div>
          </div>
          <div className="top-[68px] left-[87px] overflow-hidden absolute w-[62px] h-[54px]">
            <div className="relative w-[38px] h-[16px] top-[40px] left-[12px]">
              <div className="absolute w-[19px] h-[14px] top-0 left-[9px]" />
              <div className="absolute w-[38px] h-[14px] top-[2px] left-0 overflow-hidden">
                <div className="w-[38px] -top-px absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                  의류
                </div>
              </div>
            </div>
          </div>
          <div className="top-[6px] left-[164px] absolute w-[62px] h-[54px]">
            <div className="relative w-[38px] h-[14px] top-[40px] left-[12px]">
              <div className="absolute w-[34px] h-[14px] top-0 left-[2px]" />
              <div className="w-[38px] top-0 absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                이유용품
              </div>
            </div>
          </div>
          <div className="top-[68px] left-[164px] absolute w-[62px] h-[54px]">
            <div className="relative w-[38px] h-[14px] top-[40px] left-[12px]">
              <div className="absolute w-[19px] h-[14px] top-0 left-[9px]" />
              <div className="w-[38px] top-0 absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                기저귀
              </div>
            </div>
          </div>
          <div className="top-[6px] left-[241px] absolute w-[62px] h-[54px]">
            <div className="relative w-[42px] h-[14px] top-[40px] left-[12px] overflow-hidden">
              <div className="w-[42px] -top-px absolute h-[13px] left-[-2px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                목욕용품
              </div>
            </div>
          </div>
          <div className="top-[68px] left-[241px] absolute w-[62px] h-[54px]">
            <div className="relative w-[38px] h-[15px] top-[39px] left-[14px]">
              <div className="absolute w-[19px] h-[14px] top-px left-[8px]" />
              <div className="w-[38px] top-0 absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                임산부
              </div>
            </div>
          </div>
          <div className="top-[6px] left-[318px] absolute w-[62px] h-[54px]">
            <div className="absolute w-[34px] h-[34px] top-0 left-[14px] bg-white" />
            <div className="absolute w-[38px] h-[14px] top-[40px] left-[12px] overflow-hidden">
              <div className="w-[38px] -top-px absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                장난감
              </div>
            </div>
          </div>
          <div className="top-[68px] left-[318px] absolute w-[62px] h-[54px]">
            <div className="absolute w-[34px] h-[34px] top-0 left-[14px] bg-white">
              <img
                className="absolute w-[34px] h-[34px] top-0 left-0"
                alt="Picture shortcut"
                src="/기타.png"
              />
            </div>
            <div className="absolute w-[38px] h-[14px] top-[40px] left-[14px]">
              <div className="absolute w-[29px] h-[14px] top-0 left-[3px]" />
              <div className="w-[38px] top-0 absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                기타
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute w-[34px] h-[34px] top-[6px] left-[101px] object-cover"
          alt="Image"
          src="/수유용품.png"
        />
        <img
          className="absolute w-[34px] h-[34px] top-[68px] left-[101px] object-cover"
          alt="Image"
          src="/의류.png"
        />
        <img
          className="absolute w-[34px] h-[34px] top-[6px] left-[255px] object-cover"
          alt="Image"
          src="/목욕용품.png"
        />
        <img className="absolute w-[34px] h-[34px] top-[6px] left-[24px] object-cover" alt="Image" src="/유모차.png" />
        <img
          className="absolute w-[34px] h-[34px] top-[6px] left-[332px] object-cover"
          alt="Image"
          src="/장난감.png"
        />
        <img
          className="absolute w-[34px] h-[34px] top-[68px] left-[178px] object-cover"
          alt="Image"
          src="/기저귀.png"
        />
        <img
          className="absolute w-[34px] h-[34px] top-[68px] left-[257px] object-cover"
          alt="Image"
          src="/임산부.png"
        />
        <img
          className="absolute w-[34px] h-[34px] top-[70px] left-[24px] object-cover"
          alt="Image"
          src="/외출용품.png"
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
    <div className="w-[161px] h-[21px]">
      <div className="relative w-[161px] h-[21px] top-0 mt-4 left-4 [text-shadow:0px_4px_4px_#00000040] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#1f1f1f] text-[18px] tracking-[-0.60px] leading-[24px] whitespace-nowrap">
        회원님을 위한 추천 상품
      </div>
    </div>
    {/* 상품 목록 현재 8개 - 추후 swipe로 전개 */}
    <div className="mt-4 gap-2 grid grid-cols-2 sm:grid-cols-4">
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
