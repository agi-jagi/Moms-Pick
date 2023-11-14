"use client";

import { useState, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Image from "next/image";
import marker from "../../../../../public/marker.png";
import search from "../../../../../public/search.png";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function AddressSearch(props: any) {
  const [maps, setMaps] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);

  let map: any = null;

  const search = (data: any) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(data, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }

          const markerPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          markers.push(marker);
          marker.setMap(maps);

          props.setLatitude(result[0].y);
          props.setLongitude(result[0].x);

          const bounds = new window.kakao.maps.LatLngBounds();
          bounds.extend(markerPosition);
          maps.setBounds(bounds);

          const callback = function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              // props.setAddress(result[0].address.address_name);
            }
          };
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(result[0].x, result[0].y, callback);
          props.setIsAddressSearch(true);
        }
      });
    });
  };

  const markerReload = (data: any) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(data, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }

          const markerPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          markers.push(marker);
          marker.setMap(maps);

          props.setLatitude(result[0].y);
          props.setLongitude(result[0].x);

          const bounds = new window.kakao.maps.LatLngBounds();
          bounds.extend(markerPosition);
          maps.setBounds(bounds);

          const callback = function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              // props.setAddress(result[0].address.address_name);
            }
          };
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(result[0].x, result[0].y, callback);
        }
      });
    });
  };

  useEffect(() => {
    if (props.searchingAddress) {
      search(props.searchingAddress);
    }
  }, [props.searchingAddress]);

  useEffect(() => {
    if (!window.kakao) {
      console.log(1);
      return;
    }
    if (props.chooseAddress) {
      markerReload(props.chooseAddress);
    }
  }, [props.chooseAddress]);

  // script가 완전히 load 된 이후, 실행될 함수
  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const mapContainer = document.getElementById("map");
        const coord = new window.kakao.maps.LatLng(
          // position.coords.latitude,
          // position.coords.longitude
          props.latitude,
          props.longitude
        );
        // props.setLatitude(position.coords.latitude);
        // props.setLongitude(position.coords.longitude);
        const mapOption = {
          center: coord, // 지도의 중심좌표
        };
        map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMaps(map);
        const markerPosition = coord;
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        var infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">현재위치</div>',
        });
        infowindow.open(map, marker);
        setMarkers([marker]);
        marker.setMap(map);

        const callback = function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            // props.setAddress(result[0].address.address_name);
          }
        };
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(position.coords.longitude, position.coords.latitude, callback);
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
      <div style={{ padding: "0 10px" }}>
        <div id="map" style={{ width: "auto", height: "60vh", marginTop: "10px" }}></div>
      </div>
    </div>
  );
}
