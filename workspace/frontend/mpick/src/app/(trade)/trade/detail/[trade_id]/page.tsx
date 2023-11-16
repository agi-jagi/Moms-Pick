'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardBody, Image, Avatar, Button } from "@nextui-org/react";

import { PiWechatLogoBold } from "react-icons/pi";
import { RiHeartsFill } from "react-icons/ri"; 
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";

export default function Detail(props: any) {

  console.log(props);
  const tradeId = props.params.trade_id

  const [ detail, setDetail ] = useState<any>(null);

  const [ isLiked, setIsLiked ] = useState<string>("0");
  const toggleLike = () => {
    setIsLiked(isLiked === "0" ? "1" : "0");
  };

  const router = useRouter();

  useEffect(() => {

    async function getDetail() {
      try {

        const res = await axios.get(`/api/trades/item/${tradeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(res.data);
        setDetail(res.data.response);
        setIsLiked(res.data.response.isLiked);
        
      } catch(err) {
        console.log(err);
      }
    }

    getDetail();
  }, [tradeId]);

  async function addWish() {

    const data = {
      tradeId: tradeId,
    }

    try {
      const res = await axios.post(`/api/trades/wish`, data ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log(res.data);

    } catch(err) {
      console.log(err);
    }
  }


  if (detail === null) {
    // item 정보가 없을 경우 로딩 또는 오류 처리를 할 수 있습니다.
    return <>
    <div className="absolute top-[40%] left-[25%]">
    <Spinner label="당신을 위해 준비중입니다." color="primary"/>
    </div>
    </>
  }

  return (
    <div>
    
      <Card className="py-4 flex mt-2">
        
      <CardBody className="overflow-visible py-2 justify-center relative">
        
        <Image
          alt="detail Item Image"
          className="object-cover rounded-xl"
          src={detail.tradeImages[0]}
          width={270}
        />
        
        <IoMdArrowRoundBack
        size="30"
        className="absolute top-2 left-4 m-2 cursor-pointer z-10"
        onClick={() => router.back()}
        />
      </CardBody>
      
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        
        <div className="flex mb-4 items-center">
        <Avatar isBordered color="primary" className="ml-2 mr-2" src={detail.profile} />
        <h4 className="font-semibold text-md ml-2 mt-1">{detail.nickname}</h4>
        <span className="flex items-center ml-[9rem] gap-1.5 font-semibold text-orange-500">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            { detail.rating === -1 ? "평가중" : detail.rating}
            </span>
            </div>
        <h5 className="ml-2 font-semibold">{detail.title}</h5>
        <small className="ml-2 text-gray-700">₩ {detail.price}</small>
        <p className="mt-4 ml-2">{detail.mainCategory} | { detail.subCategory ? detail.subCategory : "없음" } | {detail.tradeBabyMonth} | 
        <span className="ml-2 text-blue-500">{detail.tradeStatus}</span>
        </p>
        <p className="mt-4 ml-2 mr-2">{detail.tradeExplain} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sed maxime officiis soluta expedita cum. Dicta eos, Tempore.</p>
        <div className="flex items-center gap-2 ml-1 mt-4 mb-2 mr-2">
        <div className="flex items-center cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-1"
            >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <span>{detail.address}</span>
        </div>
          <span className="flex items-center cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
            <RiHeartsFill className="h-5 w-5 mr-1" />
            <span>{detail.wishCount}</span>
          </span>
          <span className="flex items-center cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
            < FaRegEye className="h-5 w-5 mr-1" />
            <span>{detail.viewCount}</span>
          </span>
          </div>
      </CardHeader>
      <Button className="bg-[#5E9FF2] text-white text-md flex items-center mt-4" size="lg" 
      fullWidth={true}
      >
        <Link href={"/chat/start/" + tradeId}>
          <div className="flex items-center justify-center w-full">
            <PiWechatLogoBold size="24" className="mr-2" />
            채팅하기
          </div>
          </Link>
        </Button>
    </Card>

    
    
        <Button
          size="sm"
          color={isLiked === "1" ? 'default' : 'warning'}
          aria-label='Like'
          className="!absolute top-6 right-[110px] rounded-full mt-4 z-10"
          isIconOnly
          onClick={() => {toggleLike(); addWish();}}
        >
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isLiked === "1" ? 'red' : 'currentColor'}
            className="h-6 w-6"
          >
            <path 
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
          </svg>
        </Button>
        

    <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}