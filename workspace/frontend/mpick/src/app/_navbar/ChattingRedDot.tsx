"use client";

import { useUnReadStore } from "@/store/UnReadStore";
import { Badge, Avatar, Switch } from "@nextui-org/react";
import { PiWechatLogoBold } from "react-icons/pi";

export default function ChattingRedDot() {
  const { count } = useUnReadStore();
  return (
    <div>
      {count > 0 ? (
        <Badge color="danger" content={count} shape="circle">
          <PiWechatLogoBold className="fill-current" size={24} />
        </Badge>
      ) : (
        <PiWechatLogoBold className="fill-current" size={24} />
      )}
    </div>
  );
}
