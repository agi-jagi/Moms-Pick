"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import nursing from "../../../../public/nursing.png";
import nursing1 from "../../../../public/nursing1.png";
import nursing2 from "../../../../public/nursing2.png";
import nursing3 from "../../../../public/nursing3.png";
import meal from "../../../../public/meal.png";
import meal1 from "../../../../public/meal1.png";
import meal2 from "../../../../public/meal2.png";
import meal3 from "../../../../public/meal3.png";
import education from "../../../../public/education.png";
import education1 from "../../../../public/education1.png";
import education2 from "../../../../public/education2.png";
import education3 from "../../../../public/education3.png";
import education22 from "../../../../public/education22.png";
import Carousel from "react-material-ui-carousel";
import Link from "next/link";
import { useParentingStore } from "@/store/ParentingStore";
import { useMediaQuery } from "react-responsive";
import banner1 from "../../../../public/month/banner1.png";
import banner2 from "../../../../public/month/banner2.png";
import banner3 from "../../../../public/month/banner3.png";
import banner4 from "../../../../public/month/banner4.png";
import banner5 from "../../../../public/month/banner5.png";
import banner6 from "../../../../public/month/banner6.png";

export default function ParentingInfo() {
  const { parenting, setParenting } = useParentingStore();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div>
      <Carousel
        cycleNavigation={true}
        navButtonsAlwaysInvisible={true}
        autoPlay={true}
        animation={"slide"}
        interval={5000}
        indicators={false}
      >
        <a target="_blank" href="https://www.childcare.go.kr/cpin/main1.jsp" rel="noreferrer">
          <Image
            src={banner1}
            alt="아이사랑"
            layout="responsive"
            width={isMobile ? 512 : 768}
            height={isMobile ? 767 : 1024}
            priority
          ></Image>
        </a>
        <a target="_blank" href="https://central.childcare.go.kr/ccef/main.jsp" rel="noreferrer">
          <Image
            src={banner2}
            alt="중앙종합육아지원센터"
            layout="responsive"
            width={isMobile ? 512 : 768}
            height={isMobile ? 767 : 1024}
          ></Image>
        </a>
        <a target="_blank" href="https://www.bokjiro.go.kr/ssis-tbu/index.do" rel="noreferrer">
          <Image
            src={banner3}
            alt="복지로"
            layout="responsive"
            width={isMobile ? 512 : 768}
            height={isMobile ? 767 : 1024}
          ></Image>
        </a>
        <a target="_blank" href="https://i-love.or.kr/zine/" rel="noreferrer">
          <Image
            src={banner4}
            alt="웹진 아이사랑"
            layout="responsive"
            width={isMobile ? 512 : 768}
            height={isMobile ? 767 : 1024}
          ></Image>
        </a>
        <a target="_blank" href="https://nip.kdca.go.kr/irhp/index.jsp" rel="noreferrer">
          <Image
            src={banner5}
            alt="예방접종 도우미"
            layout="responsive"
            width={isMobile ? 512 : 768}
            height={isMobile ? 767 : 1024}
          ></Image>
        </a>
        <a target="_blank" href="https://blog.naver.com/papanet4you" rel="noreferrer">
          <Image
            src={banner6}
            alt="아빠넷"
            layout="responsive"
            width={isMobile ? 512 : 768}
            height={isMobile ? 767 : 1024}
          ></Image>
        </a>
      </Carousel>
      <Link href="/parenting/detail" passHref onClick={() => setParenting("수유")}>
        <Image
          src={nursing1}
          alt="수유"
          layout="responsive"
          width={isMobile ? 512 : 768}
          height={isMobile ? 767 : 1024}
        ></Image>
      </Link>
      <Link href="/parenting/detail" passHref onClick={() => setParenting("식단")}>
        <Image
          src={meal1}
          alt="식단"
          layout="responsive"
          width={isMobile ? 512 : 768}
          height={isMobile ? 767 : 1024}
        ></Image>
      </Link>
      <Link href="/parenting/detail" passHref onClick={() => setParenting("교육기관")}>
        <Image
          src={education1}
          alt="교육기관"
          layout="responsive"
          width={isMobile ? 512 : 768}
          height={isMobile ? 767 : 1024}
        ></Image>
      </Link>
      {/* <Link href="/parenting/detail" passHref onClick={() => setParenting("교육기관")}>
        <Image
          src={education22}
          alt="교육"
          layout="responsive"
          width={isMobile ? 512 : 768}
          height={isMobile ? 767 : 1024}
        ></Image>
      </Link> */}
    </div>
  );
}
