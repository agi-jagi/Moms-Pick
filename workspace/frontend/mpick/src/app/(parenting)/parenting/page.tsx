"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import nursing from "../../../../public/nursing.png";
import meal from "../../../../public/meal.png";
import education1 from "../../../../public/education1.png";
import education2 from "../../../../public/education2.png";
import Carousel from "react-material-ui-carousel";
import Link from "next/link";

export default function ParentingInfo() {
  return (
    <div>
      <Carousel
        cycleNavigation={true}
        navButtonsAlwaysInvisible={true}
        autoPlay={true}
        className="rounded-xl"
        animation={"slide"}
        interval={5000}
      >
        <a target="_blank" href="https://www.childcare.go.kr/cpin/main1.jsp" rel="noreferrer">
          <img src="/month/banner1.png" alt="아이사랑" className="w-full h-full"></img>
        </a>
        <a target="_blank" href="https://central.childcare.go.kr/ccef/main.jsp" rel="noreferrer">
          <img src="/month/banner2.png" alt="중앙종합육아지원센터" className="w-full h-full"></img>
        </a>
      </Carousel>

      <Link href="/parenting/detail" passHref className="flex flex-col justify-center items-center">
        <Image src={nursing} alt="수유" className="mb-6 mt-6 w-4/5"></Image>
      </Link>
      <Link href="/parenting/detail" passHref className="flex flex-col justify-center items-center">
        <Image src={meal} alt="식단" className="mb-6 w-4/5"></Image>
      </Link>
      <Link href="/parenting/detail" passHref className="flex flex-col justify-center items-center">
        <Image src={education2} alt="교육기관" className="mb-6 w-4/5"></Image>
      </Link>
      <Image src={education1} alt="교육" className="mb-6"></Image>
    </div>
  );
}
