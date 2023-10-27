'use client';

import useStore from "../../../store/useStore";
import { useTradeStore } from "@/store/TradeStore";
import { Button } from "@nextui-org/react";
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
        <div>
      Trade 페이지
      <br />
      {postId}
      <br />
      {postTitle}
      <br />
      <Button onClick={() => setPostId(30)}>postId 변경</Button>
      </div>
      ) : (
        <>
        아직 서버
        </>
      )
    }
    </>
  );
}
