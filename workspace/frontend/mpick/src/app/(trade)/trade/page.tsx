"use client";

import { useTradeStore } from "@/store/TradeStore";
import { Button, Card, CardFooter, CardBody, Image, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import TopNavBar from "./TopNavBar";
import { Spinner } from "@nextui-org/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from "axios";

// 대분류 카테고리 클릭 시 해당 대분류를 가지고 필터링 페이지로 !
// 반경 설정 컴포넌트 분리 필요
// 상단 배너 넣어야 함

export default function Trade() {
  const [isClient, setIsClient] = useState(false);

  const [tradeId, setTradeId] = useState<number>(0);

  const [recommendList, setRecommendList] = useState<any[]>([]);

  const slideSettings = {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  };

  const fastAPIURL = process.env.MPICK_WEBSOCKET_URL;

  async function getRecommend() {
    try {
      const data: any = {
        user_id: 0,
      };

      const res = await axios.post(fastAPIURL + "/api/recommend", data);
      setRecommendList(res.data);
    } catch (err) {}
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.document) {
      setIsClient(true);
      getRecommend();
    }
  }, []);

  return (
    <>
      {isClient === true ? (
        <>
          <TopNavBar />
          <div>
            {/* 상단 배너 */}
            <img className="mt-6" src="bannerImage.png" alt="광고 배너" />

            {/* 대분류 카테고리 */}
            <div className="w-[390px] h-[128px] mt-5">
              <div className="relative h-[128px]">
                <img
                  className="absolute w-[34px] h-[34px] top-[6px] left-[178px] object-cover"
                  alt="Image"
                  src="/이유용품.png"
                />

                <div className="absolute w-[390px] h-[128px] top-0 left-0">
                  <div className="top-[6px] left-[10px] absolute w-[62px] h-[54px]">
                    <div className="absolute w-[34px] h-[34px] top-0 left-[14px] bg-white">
                      <div className="h-[34px]" />
                    </div>
                    <div className="absolute w-[38px] h-[14px] top-[40px] left-[12px] overflow-hidden">
                      <div className="w-[38px] absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        유모차
                      </div>
                    </div>
                  </div>
                  <div className="top-[68px] left-[10px] absolute w-[62px] h-[54px]">
                    <div className="relative w-[44px] h-[14px] top-[40px] left-[10px] overflow-hidden">
                      <div className="w-[44px] top-[1px] absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        외출용품
                      </div>
                    </div>
                  </div>
                  <div className="top-[6px] left-[87px] absolute w-[62px] h-[54px]">
                    <div className="relative w-[61px] h-[14px] top-[40px] left-px overflow-hidden">
                      <div className="w-[61px] absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        수유용품
                      </div>
                    </div>
                  </div>
                  <div className="top-[68px] left-[87px] overflow-hidden absolute w-[62px] h-[54px]">
                    <div className="relative w-[38px] h-[16px] top-[40px] left-[12px]">
                      <div className="absolute w-[19px] h-[14px] top-0 left-[9px]" />
                      <div className="absolute w-[38px] h-[14px] top-[2px] left-0 overflow-hidden">
                        <div className="w-[38px] top-[-0.5px] absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                          의류
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="top-[6px] left-[164px] absolute w-[62px] h-[54px]">
                    <Link href={{ pathname: "/trade/search", query: { filter대분류: "이유용품" } }}>
                      <div className="relative w-[38px] h-[14px] top-[40px] left-[12px]">
                        <div className="absolute w-[34px] h-[14px] top-0 left-[2px]" />
                        <div className="w-[38px] top-0 absolute h-[13px] left-[-2px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                          이유용품
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="top-[68px] left-[164px] absolute w-[62px] h-[54px]">
                    <div className="relative w-[38px] h-[14px] top-[40px] left-[12px]">
                      <div className="absolute w-[19px] h-[14px] top-0 left-[9px]" />
                      <div className="w-[38px] top-[0.5px] absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        기저귀
                      </div>
                    </div>
                  </div>
                  <div className="top-[6px] left-[241px] absolute w-[62px] h-[54px]">
                    <div className="relative w-[42px] h-[14px] top-[40px] left-[12px] overflow-hidden">
                      <div className="w-[42px] absolute h-[13px] left-[-2px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        목욕용품
                      </div>
                    </div>
                  </div>
                  <div className="top-[68px] left-[241px] absolute w-[62px] h-[54px]">
                    <div className="relative w-[38px] h-[15px] top-[39px] left-[14px]">
                      <div className="absolute w-[19px] h-[14px] top-px left-[8px]" />
                      <div className="w-[38px] top-[1px] absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        임산부
                      </div>
                    </div>
                  </div>
                  <div className="top-[6px] left-[318px] absolute w-[62px] h-[54px]">
                    <div className="absolute w-[34px] h-[34px] top-0 left-[14px] bg-white" />
                    <div className="absolute w-[38px] h-[14px] top-[40px] left-[12px] overflow-hidden">
                      <div className="w-[38px] -top-px absolute h-[13px] left-0 [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        장난감
                      </div>
                    </div>
                  </div>
                  <div className="top-[68px] left-[318px] absolute w-[62px] h-[54px]">
                    <div className="absolute w-[34px] h-[34px] top-0 left-[14px] bg-white">
                      <Link href={{ pathname: "/trade/search", query: { filter대분류: "기타" } }}>
                        <img
                          className="absolute w-[34px] h-[34px] top-0 left-0"
                          alt="Picture shortcut"
                          src="/기타.png"
                        />
                      </Link>
                    </div>
                    <div className="absolute w-[38px] h-[14px] top-[40px] left-[14px]">
                      <div className="absolute w-[29px] h-[14px] top-0 left-[3px]" />
                      <div className="w-[38px] top-0 absolute h-[13px] left-[-1.5px] [font-family:'Pretendard-Regular',Helvetica] font-normal text-[#1f1f1f] text-[11px] text-center tracking-[0] leading-[14px] whitespace-nowrap">
                        기타
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "수유용품" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[6px] left-[101px] object-cover"
                    alt="Image"
                    src="/수유용품.png"
                  />
                </Link>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "의류" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[68px] left-[101px] object-cover"
                    alt="Image"
                    src="/의류.png"
                  />
                </Link>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "목욕용품" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[6px] left-[255px] object-cover"
                    alt="Image"
                    src="/목욕용품.png"
                  />
                </Link>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "유모차" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[6px] left-[24px] object-cover"
                    alt="Image"
                    src="/유모차.png"
                  />
                </Link>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "장난감" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[6px] left-[332px] object-cover"
                    alt="Image"
                    src="/장난감.png"
                  />
                </Link>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "기저귀" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[68px] left-[178px] object-cover"
                    alt="Image"
                    src="/기저귀.png"
                  />
                </Link>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "임산부" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[68px] left-[257px] object-cover"
                    alt="Image"
                    src="/임산부.png"
                  />
                </Link>
                <Link href={{ pathname: "/trade/search", query: { filter대분류: "외출용품" } }}>
                  <img
                    className="absolute w-[34px] h-[34px] top-[70px] left-[24px] object-cover"
                    alt="Image"
                    src="/외출용품.png"
                  />
                </Link>
              </div>
            </div>
            <div className="w-[161px] h-[21px]">
              <div className="relative w-[161px] h-[21px] top-0 mt-6 left-4 [text-shadow:0px_4px_4px_#00000040] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#1f1f1f] text-[18px] tracking-[-0.60px] leading-[24px] whitespace-nowrap">
                회원님을 위한 추천 상품
              </div>
            </div>
          </div>

          {/* Zenn사마 혼또니 아리가또 */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            breakpoints={slideSettings}
            slidesPerView={"auto"}
            centeredSlides={true}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation
            // pagination={{
            //   clickable: true,
            // }}
            className="max-w-full mt-7"
          >
            {recommendList.map((item, index) => (
              <SwiperSlide key={index}>
                <Card
                  className="h-[16rem] w-[15rem]"
                  shadow="md"
                  isPressable
                  onPress={() => setTradeId(item.trade_id)}
                >
                  <CardBody className="overflow-visible w-[15rem] p-0 h-[13rem]">
                    <Link href={"/trade/detail/" + tradeId}>
                      <Image
                        shadow="sm"
                        radius="lg"
                        className="object-cover h-[13rem] w-[15rem]"
                        alt={item.title}
                        src={item.save_file_name}
                      />
                    </Link>
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.title}</b>
                    <p className="text-default-500">₩ {item.price}</p>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
        </>
      ) : (
        <>
          <div className="absolute top-[40%] left-[25%]">
            <Spinner label="당신을 위해 준비중입니다." color="primary" />
          </div>
        </>
      )}
      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </>
  );
}
