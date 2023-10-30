'use client';

import useStore from "../../../store/useStore";
import { useTradeStore } from "@/store/TradeStore";
import { Button, Card, CardFooter,CardHeader, CardBody, Image, Avatar, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {SearchIcon} from "./searchIcon";


export default function Trade() {

  const [ isClient, setIsClient ] = useState(false);
  const { postId, setPostId, postTitle, setPostTitle } = useTradeStore();

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
      <Button onClick={() => setPostId(30)}>postId 변경</Button>
      </div>
      <Card
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
    </Card>
    <Card className="py-4">
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
    </Card>
    <div className="flex gap-4 items-center">
      <Avatar isBordered color="default" src="/nezko.jfif" />
      <Avatar isBordered color="primary" src="/nezko.jfif" />
      <Avatar isBordered color="secondary" src="/nezko.jfif" />
      <Avatar isBordered color="success" src="/nezko.jfif" />
      <Avatar isBordered color="warning" src="/nezko.jfif" />
      <Avatar isBordered color="danger" src="/nezko.jfif" />
    </div>
    <div className="w-[340px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      <Input
        label="Search"
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
    <Input
      isClearable
      type="search"
      label="Search"
      variant="bordered"
      placeholder="검색어 입력"
      defaultValue="호윤"
      onClear={() => console.log("input cleared")}
      className="max-w-xs"
    />
    
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
