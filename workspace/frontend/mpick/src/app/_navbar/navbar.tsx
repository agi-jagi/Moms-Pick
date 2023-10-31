import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { AiOutlineHome } from "react-icons/ai";
import { LuBaby } from "react-icons/lu";
import { PiWechatLogoBold } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";

export default function navBar() {
  return (
    <div className="w-full" style={{ position: "fixed", bottom: "0", backgroundColor: "white" }}>
      <Divider className="my-4" style={{ marginTop: "0" }} />
      <div className="columns-4" style={{ height: "60px" }}>
        <div style={{ alignItems: "center" }}>
          <Link href="/trade">
            <div>
              <div className="flex justify-center">
                <AiOutlineHome size="24" />
              </div>
              <div className="flex justify-center">
                <p>홈</p>
              </div>
            </div>
          </Link>
        </div>
        <div style={{ alignItems: "center" }}>
          <Link href="/month">
            <div>
              <div className="flex justify-center">
                <LuBaby size="24" />
              </div>
              <div className="flex justify-center">
                <p>육아정보</p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/chat">
            <div>
              <div className="flex justify-center">
                <PiWechatLogoBold size="24" />
              </div>
              <div className="flex justify-center">
                <p>채팅</p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/mypage">
            <div>
              <div className="flex justify-center">
                <AiOutlineUser size="24" />
              </div>
              <div className="flex justify-center">
                <p>내 정보</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
