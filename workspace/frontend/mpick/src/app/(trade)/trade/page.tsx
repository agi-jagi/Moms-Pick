'use client';

import useStore from "../../../store/useStore";
import { useTradeStore } from "@/store/tradeStore";
import { Button } from "@nextui-org/react"
import { useEffect } from "react";

export default function Trade() {

  const { postId, setPostId, postTitle, setPostTitle } = useTradeStore();

  useEffect(() => {
    if (typeof window != 'undefined') {
      const res = localStorage.getItem('postId');
      console.log(res)
      // setPostId(res);

    }
  },[])

  

  return (
    <div>
      Trade 페이지
      <br />
      {postId}
      <br />
      {postTitle}
      <br />
      <Button onClick={() => setPostId(30)}>postId 변경</Button>


    </div>
  );
}
