'use client';

import GoBack from '@/app/(auth)/auth/GoBack';
import { Image, Avatar, Button } from "@nextui-org/react";
import { PiWechatLogoBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";

export default function Detail(props: any) {

  console.log(props);

  return (
    <div>
      <h1>판매글 상세 페이지</h1>
      <GoBack />
      <Image
      isBlurred
      width={240}
      src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
      alt="NextUI Album Cover"
      className="m-5"
    />
    <Avatar isBordered color="primary" src='/nezko.jfif' />
    <span>카마도 네즈코</span>
    <img src="/Star 3.svg" alt="별 이모티콘" />5.0
    <p>실버크로스 발모랄</p>
    <p>대분류 | 중분류 | 개월 | 조회수 411</p>
    <br></br>
    <p>판매글 내용</p>

    <FaRegHeart size="24"/>

    <p>₩ 2,000,000</p>

    
    <Button color="primary"
    startContent={<PiWechatLogoBold size="24"/>}
    className="font-semibold text-md">
                  채팅하기
                </Button>
      
    </div>
  );
}