"use client";

import { useState, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Image from "next/image";
import search from "../../../../../public/search.png";
import instance from "@/app/_config/axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ScrollShadow } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Kindergarten {
  kinderName: string;
  establish: string;
  address: string;
  hpAddress: string;
}

interface Daycare {
  dayCareCenterName: string;
  establish: string;
  address: string;
  hpAddress: string;
}

export default function Education() {
  const [markers, setMarkers] = useState<any>([]);
  const [maps, setMaps] = useState<any>();
  const [address, setAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<any>("");
  const [longitude, setLongitude] = useState<any>("");
  const [education, setEducation] = useState<number>(0);
  const [kindergartens, setKindergartens] = useState<Kindergarten[]>([
    { kinderName: "", establish: "", address: "", hpAddress: "" },
  ]);
  const [daycares, setDaycares] = useState<Daycare[]>([
    { dayCareCenterName: "", establish: "", address: "", hpAddress: "" },
  ]);
  const [isMapSetting, setIsMapSetting] = useState<boolean>(false);

  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  let map: any = null;

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    const { addressType, bname, buildingName } = data;
    if (addressType === "R") {
      if (bname !== "") {
        extraAddress += bname;
      }
      if (buildingName !== "") {
        extraAddress += `${extraAddress !== "" && ", "}${buildingName}`;
      }
      fullAddress += `${extraAddress !== "" ? ` ${extraAddress}` : ""}`;
    }

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(fullAddress, function (result: any, status: any) {
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
          setLatitude(result[0].y);
          setLongitude(result[0].x);

          const bounds = new window.kakao.maps.LatLngBounds();
          bounds.extend(markerPosition);
          maps.setBounds(bounds);

          const callback = function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              setAddress(result[0].address.address_name);
            }
          };
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(result[0].x, result[0].y, callback);
        }
      });
    });
  };

  const settingMarkers = (data: any) => {
    let fullAddress = data.address;

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(fullAddress, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const markerPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          markers.push(marker);
          marker.setMap(maps);
        }
      });
    });
  };

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const mapContainer = document.getElementById("map");
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        const coord = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const mapOption = {
          center: coord,
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
        setIsMapSetting(true);
        const callback = function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            setAddress(result[0].address.address_name);
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
      const mapScript = document.createElement("script");
      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOMAP_APPKEY}&libraries=services&autoload=false`;
      document.head.appendChild(mapScript);
      mapScript.addEventListener("load", onLoadKakaoMap);
    }
  }, []);

  const selectedEducation = (event: React.SyntheticEvent, tabName: number) => {
    setEducation(tabName);
  };

  const getKindergarten = async () => {
    try {
      const response = await instance.get("/api/info/kinder", {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      const kindergartenData: Kindergarten[] = response.data.response.map((item: Kindergarten) => ({
        kinderName: item.kinderName,
        establish: item.establish,
        address: item.address,
        hpAddress: item.hpAddress,
      }));
      setKindergartens(kindergartenData);
    } catch (error) {
      console.log("유치원 정보 조회 실패");
    }
  };

  const getDaycare = async () => {
    try {
      const response = await instance.get("/api/info/daycare", {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      const daycareData: Daycare[] = response.data.response.map((item: Daycare) => ({
        dayCareCenterName: item.dayCareCenterName,
        establish: item.establish,
        address: item.address,
        hpAddress: item.hpAddress,
      }));
      setDaycares(daycareData);
    } catch (error) {
      console.log("어린이집 정보 조회 실패");
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getKindergarten();
      getDaycare();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (isMapSetting && kindergartens.length > 0) {
      for (let i = 0; i < kindergartens.length; i++) {
        settingMarkers(kindergartens[i]);
      }
    }
  }, [isMapSetting, kindergartens]);

  useEffect(() => {
    if (isMapSetting && daycares.length > 0) {
      for (let i = 0; i < daycares.length; i++) {
        settingMarkers(daycares[i]);
      }
    }
  }, [isMapSetting, daycares]);

  return (
    <div>
      <div style={{ padding: "0 1px" }}>
        <div id="map" style={{ width: "auto", height: "40vh", marginTop: "10px" }}></div>
        <div
          className="flex mt-5"
          style={{ border: "1px solid black", padding: "10px", width: "100%" }}
        >
          <button type="button" onClick={handleClick}>
            <Image src={search} alt="marker" width={30} height={30} />
          </button>
          <p className="font-bold text-base ml-3">주소 : {address}</p>
        </div>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={education} onChange={selectedEducation} centered>
            <Tab label="어린이집"></Tab>
            <Tab label="유치원"></Tab>
          </Tabs>
        </Box>
      </div>
      <div style={{ height: "calc(100vh - 60vh)", overflow: "auto", padding: "0 1px" }}>
        <Table isStriped aria-label="Example static collection table" className="mt-3">
          <TableHeader>
            <TableColumn className="text-center text-bold text-sm">기관명</TableColumn>
            <TableColumn className="text-center text-bold text-sm">구분</TableColumn>
            <TableColumn className="text-center text-bold text-sm">주소</TableColumn>
            <TableColumn className="text-center text-bold text-sm">사이트</TableColumn>
          </TableHeader>
          <TableBody>
            {education === 0
              ? daycares.map((daycare, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{daycare.dayCareCenterName}</TableCell>
                    <TableCell className="text-center">{daycare.establish}</TableCell>
                    <TableCell className="text-center">{daycare.address}</TableCell>
                    <TableCell className="text-center">
                      {daycare.hpAddress !== "nan" ? (
                        <a href={daycare.hpAddress} target="_blank" rel="noopener noreferrer">
                          이동
                        </a>
                      ) : (
                        <p onClick={() => alert("사이트가 존재하지 않습니다.")}>이동</p>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : kindergartens.map((kindergarten, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{kindergarten.kinderName}</TableCell>
                    <TableCell className="text-center">{kindergarten.establish}</TableCell>
                    <TableCell>{kindergarten.address}</TableCell>
                    <TableCell className="text-center">
                      {kindergarten.hpAddress ? (
                        <a href={kindergarten.hpAddress} target="_blank" rel="noopener noreferrer">
                          이동
                        </a>
                      ) : (
                        <p onClick={() => alert("사이트가 존재하지 않습니다.")}></p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
