'use client';

import useStore from "../../../store/useStore";
import { useTradeStore } from "@/store/TradeStore";
import { Button, Card, CardFooter,CardHeader, CardBody, Image, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";

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
