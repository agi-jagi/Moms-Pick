"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import { MdOutlineFace2 } from "react-icons/md";
import Link from "next/link";
import { useMonthStore } from "@/store/MonthStore";
import { FaCheck } from "react-icons/fa";
import Carousel from "react-material-ui-carousel";

export default function Month() {
  const monthList: string[] = [
    "임산부",
    "신생아",
    "1~3개월",
    "4~6개월",
    "7~9개월",
    "10~12개월",
    "13~24개월",
    "25~36개월",
    "36개월~",
  ];

  const { month, setMonth } = useMonthStore();

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
          <img
            src="/month/banner1.png"
            alt="아이사랑"
            style={{ width: "100%", height: "100%" }}
          ></img>
        </a>
        <a target="_blank" href="https://central.childcare.go.kr/ccef/main.jsp" rel="noreferrer">
          <img
            src="/month/banner2.png"
            alt="중앙종합육아지원센터"
            style={{ width: "100%", height: "100%" }}
          ></img>
        </a>
      </Carousel>
      <br></br>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "3%",
          fontSize: "130%",
          marginBottom: "3%",
        }}
      >
        <p>알고 싶은 개월 수 선택</p>
        <FaCheck></FaCheck>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {monthList.map((monthItem: string, index: number) => (
          <div
            key={index}
            style={{
              position: "relative",
              flex: "0 0 33%",
              textAlign: "center",
              marginBottom: "3%",
              padding: "1%",
            }}
            onClick={() => setMonth(monthItem)}
          >
            <Link href="/month/monthinfo/" passHref>
              <div
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  backgroundColor: "#F8DCD8",
                  borderRadius: "25%",
                  position: "relative",
                }}
              ></div>
              {/* <Image
                src="/month/box1.png"
                alt={monthItem}
                width={80}
                height={80}
                style={{ width: "100%", height: "100%" }}
              ></Image> */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                }}
              >
                <p style={{ color: "white", fontWeight: "bold" }}>{monthItem}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* <div
        onClick={() => alert("임산부 클릭 완료")}
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src={box} alt="임산부"></Image>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p style={{ color: "white" }}>임산부</p>
        </div>
      </div> */}
    </div>
  );
}
