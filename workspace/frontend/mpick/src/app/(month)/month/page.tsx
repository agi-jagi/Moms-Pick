"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
      <div className="flex justify-center items-center ml-3 text-2xl mb-3">
        <p>알고 싶은 개월 수 선택</p>
        <FaCheck></FaCheck>
      </div>
      <div className="flex flex-wrap justify-center items-center">
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
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                }}
              >
                <p className="text-white font-bold text-lg">{monthItem}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
