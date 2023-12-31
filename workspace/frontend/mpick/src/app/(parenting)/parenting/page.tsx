"use client";
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
import Link from "next/link";
import { useParentingStore } from "@/store/ParentingStore";
import { useMediaQuery } from "react-responsive";
import CarouselLink from "./Carousel";

export default function ParentingInfo() {
  const { parenting, setParenting } = useParentingStore();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const imageSize = {
    display: "block",
    width: isMobile ? "100%" : "768px",
    height: isMobile ? "auto" : "1024px",
    marginTop: "20px",
    transform: "scale(1.05)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
    borderRadius: "15px",
    transition: "transform 0.3s ease-in-out,, boxShadow 0.3s ease-in-out",
  };

  return (
    <div>
      <CarouselLink></CarouselLink>

      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <Link href="/parenting/detail" passHref onClick={() => setParenting("수유")}>
          <Image src={nursing1} alt="수유" layout="responsive" style={imageSize}></Image>
        </Link>
        <Link href="/parenting/detail" passHref onClick={() => setParenting("식단")}>
          <Image src={meal1} alt="식단" layout="responsive" style={imageSize}></Image>
        </Link>
        <Link href="/parenting/detail" passHref onClick={() => setParenting("교육기관")}>
          <Image src={education1} alt="교육기관" layout="responsive" style={imageSize}></Image>
        </Link>
      </div>
      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
