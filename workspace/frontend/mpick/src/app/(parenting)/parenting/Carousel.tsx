import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import banner1 from "../../../../public/month/banner1.png";
import banner2 from "../../../../public/month/banner2.png";
import banner3 from "../../../../public/month/banner3.png";
import banner4 from "../../../../public/month/banner4.png";
import banner5 from "../../../../public/month/banner5.png";
import banner6 from "../../../../public/month/banner6.png";
import { useMediaQuery } from "react-responsive";

export default function CarouselLink() {
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
    </div>
  );
}
