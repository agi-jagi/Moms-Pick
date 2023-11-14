"use client";

import { useTradeStore } from "@/store/TradeStore";
import { useEffect, useState } from "react";
import {
  Chip,
  Card,
  CardFooter,
  Image,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Select,
  SelectItem,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import FilterIcon from "./FilterIcon";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import Link from "next/link";

export default function Search() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filter대분류, setFilter대분류] = useState<string>("");

  const [중분류open, set중분류Open] = useState(false);
  const handleOpen중분류 = () => set중분류Open(!중분류open);
  const [filter중분류, setFilter중분류] = useState<string>("");

  const [개월수open, set개월수Open] = useState(false);
  const handleOpen개월수 = () => set개월수Open(!개월수open);
  const [filter개월, setFilter개월] = useState<number[]>([]);

  const [등록open, set등록Open] = useState(false);
  const handleOpen등록 = () => set등록Open(!등록open);

  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0");
  const [tradeExplain, setTradeExplain] = useState("");
  const [tradeId, setTradeId] = useState<number>(0);

  const [searchList, setSearchList] = useState<any>([]);

  const [categoryList, setCategoryList] = useState<any>({});
  const mainCategoryList = [
    "유모차",
    "수유용품",
    "이유용품",
    "목욕용품",
    "장난감",
    "외출용품",
    "의류",
    "기저귀",
    "임산부",
    "기타",
  ];

  const babyMonthList = [
    "임산부",
    "0~3개월",
    "4~6개월",
    "7~9개월",
    "10~12개월",
    "13~24개월",
    "25~36개월",
    "36개월 이상",
  ];

  const [selectedMonthList, setSelectedMonthList] = useState<number[]>([]);

  const handleMonthSelect = (index: number) => {
    // 이미 선택된 항목이라면 제거, 아니라면 추가
    if (selectedMonthList.includes(index)) {
      setSelectedMonthList((prevList) => prevList.filter((item) => item !== index));
    } else {
      setSelectedMonthList((prevList) => [...prevList, index]);
    }
  };

  const handleFilter개월 = (index: number) => {
    // 이미 선택된 항목이라면 제거, 아니라면 추가
    if (filter개월.includes(index)) {
      setFilter개월((prevList) => prevList.filter((item) => item !== index));
    } else {
      setFilter개월((prevList) => [...prevList, index]);
    }
  };

  //  판매글 등록 요청 함수
  async function registerTrade(e: any) {
    e.preventDefault();

    try {
      let files = e.target.image_files.files;
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const newPrice = parseInt(price);

      const data: any = {
        mainCategory: selectedMainCategory,
        subCategory: selectedSubCategory,
        title: title,
        price: newPrice,
        tradeExplain: tradeExplain,
        babyMonthIds: selectedMonthList,
      };

      formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

      const res = await axios.post("/api/trades/item", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      setSelectedMonthList([]);
    } catch (err) {
      console.log(err);
    }
  }

  // 판매글 검색 요청 함수
  async function searchTrade() {
    try {
      const data: any = {
        query: {
          bool: {
            must: [
              { match: { mainCategory: "유모차" } },
              null,
              // { match: { subCategory: '젖병' } },
              { match: { status: "판매중" } },

              // { match: { title: '' } },
              // { match: { tradeMonth: '' } },
            ],
            filter: {
              geo_distance: {
                distance: "100000km",
                location: {
                  lat: 35.2026038557392,
                  lon: 126.815091346254,
                },
              },
            },
          },
        },
        size: 8,
        from: 0,
      };

      const res = await axios.post("/mpick/_search", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log(res.data);
      setSearchList(res.data.hits.hits);
    } catch (err) {
      console.log(err);
    }
  }

  // getCategory 함수를 useEffect 내에서 호출
  useEffect(() => {
    async function getCategory() {
      try {
        const res = await axios.get(`/api/trades/item/category`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setCategoryList(res.data.response.category);
      } catch (err) {
        console.log(err);
      }
    }

    getCategory(); // useEffect 내에서 getCategory 호출
  }, []); // 빈 배열을 전달하여 이펙트가 한 번만 실행되도록 함

  return (
    <>
      <div>
        <Button onClick={() => console.log(categoryList)}>리스트 확인</Button>
        <Button onClick={searchTrade}>ES 발사 확인</Button>
        <Button onClick={() => console.log(searchList)}>ES 리스트 확인</Button>
        <div className="flex gap-4 mt-4 justify-center">
          <Chip
            startContent={<FilterIcon />}
            variant="faded"
            color="default"
            endContent={<BsChevronDown className="mr-1" />}
            className="shadow-md"
            onClick={() => onOpen()}
          >
            대분류
          </Chip>
          <Chip
            startContent={<FilterIcon />}
            variant="faded"
            color="default"
            endContent={<BsChevronDown className="mr-1" />}
            className="shadow-md"
            onClick={() => onOpen()}
          >
            중분류
          </Chip>
          <Chip
            startContent={<FilterIcon />}
            variant="faded"
            color="default"
            endContent={<BsChevronDown className="mr-1" />}
            className="shadow-md"
            onClick={() => onOpen()}
          >
            개월수
          </Chip>
        </div>
        <div className="flex justify-between items-center w-full mt-2">
          <div className="relative w-[172px] h-[40px]">
            <div className="absolute w-[161px] h-[21px] mt-1 top-5 left-5 [text-shadow:0px_4px_4px_#00000040] [font-family:'Pretendard-SemiBold',Helvetica] font-semibold text-[#1f1f1f] text-[18px] tracking-[-0.60px] leading-[24px] whitespace-nowrap">
              검색 결과
            </div>
          </div>
          <Button
            onClick={() => handleOpen등록()}
            startContent={<BiSolidMessageSquareAdd />}
            radius="full"
            className="top-3 right-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg"
          >
            판매글 등록
          </Button>

          {/* 판매글 등록 입력 폼 모달 */}
          <Modal isOpen={등록open} onOpenChange={handleOpen등록}>
            <ModalContent>
              {() => (
                <>
                  <form onSubmit={(e) => registerTrade(e)}>
                    <ModalHeader className="flex flex-col gap-1">판매글 등록</ModalHeader>
                    <ModalBody>
                      <input type="file" name="image_files" accept="image/*" />
                      <Input
                        variant="faded"
                        label="글 제목"
                        value={title}
                        size="md"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Input
                        variant="faded"
                        type="number"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">₩</span>
                          </div>
                        }
                        label="가격"
                        value={price}
                        size="md"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <Textarea
                        variant="faded"
                        label="글 내용"
                        placeholder="글 내용을 입력해주세요."
                        value={tradeExplain}
                        onChange={(e) => setTradeExplain(e.target.value)}
                      />
                      <Select label="대분류 선택">
                        {mainCategoryList.map((item, index) => (
                          <SelectItem key={index} onClick={() => setSelectedMainCategory(item)}>
                            {item}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select label="중분류 선택">
                        {selectedMainCategory &&
                          categoryList[selectedMainCategory]?.map((item: string) => (
                            <SelectItem key={item} onClick={() => setSelectedSubCategory(item)}>
                              {item}
                            </SelectItem>
                          ))}
                      </Select>
                      <p className="font-semibold">개월 선택 (임산부 이외 중복 가능)</p>
                      <div className="flex flex-wrap gap-3">
                        {babyMonthList.map((month, index) => (
                          <Checkbox
                            key={index}
                            value={month}
                            checked={selectedMonthList.includes(index)}
                            onChange={() => handleMonthSelect(index + 1)}
                            isDisabled={
                              (index !== 0 && selectedMonthList.includes(1)) ||
                              (index === 0 && selectedMonthList.some((item) => item !== 1)) // "임산부"가 아닌 다른 개월 선택 시 "임산부" 비활성화
                            }
                          >
                            {month}
                          </Checkbox>
                        ))}
                      </div>

                      {/* <Button onClick={()=>console.log(selectedMonthList)}>담긴 개월 조회</Button> */}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="bg-[#5E9FF2] text-white"
                        type="submit"
                        onClick={handleOpen등록}
                      >
                        등록하기
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* 검색 결과 리스트 */}
        </div>
      </div>
      <div className="mt-5 gap-2 grid grid-cols-2 sm:grid-cols-4">
        {searchList.map((item: any, index: number) => (
          <Card shadow="sm" key={index} isPressable onPress={() => setTradeId(item._source.id)}>
            <CardBody className="overflow-visible p-0">
              <Link href={"/trade/detail/" + tradeId} onClick={() => console.log(tradeId)}>
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item._source.title}
                  className="w-full object-cover h-[140px]"
                  src={item._source.img}
                  // src="/nezko.jfif"
                />
              </Link>
            </CardBody>

            <CardFooter className="text-small justify-between">
              <b>{item._source.title}</b>
              <p className="text-default-500">₩ {item._source.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 필터링 카테고리 모달 */}
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setFilter개월([]);
        }}
      >
        <ModalContent>
          {() => (
            <>
              {/* <form onSubmit={(e) => registerTrade(e)}> */}
              <ModalHeader className="flex flex-col gap-1">카테고리 필터링</ModalHeader>
              <ModalBody>
                <Select label="대분류 선택" placeholder={filter대분류}>
                  {mainCategoryList.map((item, index) => (
                    <SelectItem key={index} onClick={() => setFilter대분류(item)}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>

                <Select label="중분류 선택" placeholder={filter중분류}>
                  {filter대분류 &&
                    categoryList[filter대분류]?.map((item: string) => (
                      <SelectItem key={item} onClick={() => setFilter중분류(item)}>
                        {item}
                      </SelectItem>
                    ))}
                </Select>
                <p className="font-semibold">개월 선택 (임산부 이외 중복 가능)</p>
                <div className="flex flex-wrap gap-3">
                  {babyMonthList.map((month, index) => (
                    <Checkbox
                      key={index}
                      value={month}
                      checked={filter개월.includes(index)}
                      onChange={() => handleFilter개월(index + 1)}
                      isDisabled={
                        (index !== 0 && filter개월.includes(1)) ||
                        (index === 0 && filter개월.some((item) => item !== 1)) // "임산부"가 아닌 다른 개월 선택 시 "임산부" 비활성화
                      }
                    >
                      {month}
                    </Checkbox>
                  ))}
                </div>

                {/* <Button onClick={()=>console.log(filter개월)}>담긴 개월 조회</Button> */}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#5E9FF2] text-white"
                  type="submit"
                  onClick={() => {
                    onOpenChange();
                    setFilter개월([]);
                  }}
                >
                  적용하기
                </Button>
              </ModalFooter>
              {/* </form> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
