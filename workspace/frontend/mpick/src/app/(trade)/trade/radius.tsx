"use client";

import { useState, useEffect } from "react";
import useKakaomap from "./useKakaomap";
import { Button } from "@nextui-org/react";
import { useTradeStore } from "@/store/TradeStore";

export default function Radius() {
  const { settingRadius } = useKakaomap();

  const { distance, setDistance } = useTradeStore();

  const [values, setValue] = useState<number>(2000); // 초기값 설정
  const [circle, setCircle] = useState<any>(null);
  let value: number = 2000;

  const handleSliderChange = (e: any) => {
    value = e.target.value;
    setValue(e.target.value);
    settingRadius(circle, values);
  };

  let map: any = null;
  const markers: any = [];

  let drawingCircle: any = null;
  let centerPosition: any = null;
  const circles: any = [];

  // script가 완전히 load 된 이후, 실행될 함수
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const mapContainer = document.getElementById("map");
        centerPosition = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ); // 지도의 중심좌표
        const mapOption = {
          center: centerPosition,
          level: 8, // 지도의 확대 레벨
        };
        map = new window.kakao.maps.Map(mapContainer, mapOption);
        const markerPosition = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        markers.push(marker);
        marker.setMap(map);

        if (!drawingCircle) {
          drawingCircle = new window.kakao.maps.Circle({
            center: centerPosition,
            radius: value,
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: "#00a0e9", // 선의 색깔입니다
            strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            fillColor: "#00a0e9", // 채우기 색깔입니다
            fillOpacity: 0.2, // 채우기 불투명도입니다
          });
        }
        drawingCircle.setMap(map);
        setCircle(drawingCircle);
        circles.push(drawingCircle);
      });
    });
  };

  let count = 0;

  useEffect(() => {
    if (count === 0) {
      count++;
      // DOM을 이용하여 script 태그를 만들어주자.
      const mapScript = document.createElement("script");
      // script.async = true 라면,
      // 해당 스크립트가 다른 페이지와는 비동기적으로 동작함을 의미한다.
      mapScript.async = true;
      // script.src에 map을 불러오는 api를 넣어주자.
      // 여기에서 우리가 기존에 발급 받았던 apiKey를 넣어주면 된다.
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOMAP_APPKEY}&libraries=services&autoload=false`;

      //이제 우리가 만든 script를 document에 붙여주자.
      document.head.appendChild(mapScript);

      // sciprt가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
      mapScript.addEventListener("load", onLoadKakaoMap);
    }
  }, []);

  return (
    <div>
      <div className="mt-1" id="map" style={{ width: "auto", height: "500px" }}></div>
      <div className="mt-2 gap-2">
      <Button className="mr-1 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={() => {settingRadius(circle, 2000); setDistance("2km");}}>2km</Button>
      <Button className="mr-1 bg-gradient-to-r from-cyan-200 to-cyan-400 text-black shadow-lg" onClick={() => {settingRadius(circle, 4000); setDistance("4km");}}>4km</Button>
      <Button className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 text-black shadow-lg" onClick={() => {settingRadius(circle, 6000); setDistance("6km");}}>6km</Button>
      </div>
    </div>
  );
}
