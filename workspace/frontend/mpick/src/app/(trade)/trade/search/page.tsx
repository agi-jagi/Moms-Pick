'use client';

import { useTradeStore } from "@/store/TradeStore";
import { useEffect, useState } from "react";
import { Chip, Card, CardFooter, Image, CardBody, Button,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  CheckboxGroup, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Input, Textarea, CardHeader, Typography, Dialog } from "@material-tailwind/react";
import FilterIcon from "./FilterIcon";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";


export default function Search() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selected대분류, setSelected대분류] = useState<string[]>([]);

  const [중분류open, set중분류Open] = useState(false);
  const handleOpen중분류 = () => set중분류Open(!중분류open);
  const [selected중분류, setSelected중분류] = useState<string[]>([]);

  const [개월수open, set개월수Open] = useState(false);
  const handleOpen개월수 = () => set개월수Open(!개월수open);
  const [selected개월, setSelected개월] = useState<string[]>([]);

  const [ 등록open, set등록Open] = useState(false);
  const handleOpen등록 = () => set등록Open(!등록open);

  const [ selectedMainCategory, setSelectedMainCategory ] = useState<string>('');
  const [ selectedSubCategory, setSelectedSubCategory ] = useState<string>('');
  const [ title, setTitle ] = useState("");
  const [ price, setPrice ] = useState("0");
  const [ tradeExplain, setTradeExplain ] = useState("");
  const [ tradeId, setTradeId ] = useState<number>(1);

  const [ categoryList, setCategoryList ] = useState<any>({});
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
    "기타"
  ]

  const babyMonthList = [
    "임산부",
    "0~3개월",
    "4~6개월",
    "7~9개월",
    "10~12개월",
    "13~24개월",
    "25~36개월",
    "36개월 이상"
  ]

  const [ selectedMonthList, setSelectedMonthList ] = useState<number[]>([]);

  const handleMonthSelect = (index: number) => {
    // 이미 선택된 항목이라면 제거, 아니라면 추가
    if (selectedMonthList.includes(index)) {
      setSelectedMonthList((prevList) => prevList.filter((item) => item !== index));
    } else {
      setSelectedMonthList((prevList) => [...prevList, index]);
    }
  };
  

  const list = [
    {
      title: "목욕용품",
      img: "/nezko.jfif",
      price: "₩ 20,000",
    },
    {
      title: "수유용품",
      img: "/nezko.jfif",
      price: "₩ 300,000",
    },
    {
      title: "이유용품",
      img: "/nezko.jfif",
      price: "₩ 100,000",
    },
    {
      title: "기저귀",
      img: "/nezko.jfif",
      price: "₩ 53,000",
    },
  ];

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

    const data :any = {
      mainCategory: selectedMainCategory,
      subCategory: selectedSubCategory,
      title: title,
      price: newPrice,
      tradeExplain: tradeExplain,
      babyMonthIds: selectedMonthList,
    };

    formData.append("data",new Blob([JSON.stringify(data)],{type:'application/json'}))

    const res = await axios.post("/api/trades/item", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'multipart/form-data'
      },
    }); 
    console.log(res.data)
    setSelectedMonthList([]);

  } catch(err) {
    console.log(err);
  };
  };
  
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
      <Button onClick={()=>console.log(categoryList)}>리스트 확인</Button>
      <Image src="https://mpick-img-storage.s3.ap-northeast-2.amazonaws.com/static/3088fd38-eb9a-4bd4-85f8-243086e4ae15"></Image>
      <div className="flex gap-4 mt-4 justify-center">
      <Chip
        startContent={<FilterIcon />}
        variant="faded"
        color="default"
        endContent={<BsChevronDown className="mr-1"/>}
        className="shadow-md"
        onClick={() => onOpen()}
        
      >
        대분류
      </Chip>
      <Chip
        startContent={<FilterIcon />}
        variant="faded"
        color="default"
        endContent={<BsChevronDown className="mr-1"/>}
        className="shadow-md"
        onClick={() => handleOpen중분류()}
      >
        중분류
      </Chip>
      <Chip
        startContent={<FilterIcon />}
        variant="faded"
        color="default"
        endContent={<BsChevronDown className="mr-1"/>}
        className="shadow-md"
        onClick={() => handleOpen개월수()}
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
        <Modal isOpen={등록open} onOpenChange={handleOpen등록} >
          
    <ModalContent>
          {() => (
            <>
              
                <form onSubmit={(e) => registerTrade(e)}>
                <ModalBody>
                  <CardHeader
                      variant="gradient"
                      color="blue"
                      className="grid mb-4 h-28 place-items-center"
                    >
                      <Typography variant="h3" color="white">
                        판매글 등록
                      </Typography>
                    </CardHeader>
                  <input type="file"
                    name="image_files"
                    accept="image/*" />
                  <Input 
                  crossOrigin={true}
                  label="글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
                  <Input 
                  crossOrigin={true}
                  label="가격" value={price} size="lg" onChange={(e) => setPrice(e.target.value)} />
                  <Textarea
                  label="글 내용" value={tradeExplain} onChange={(e) => setTradeExplain(e.target.value)} />
                  <Select
                  label="대분류 선택" 
                  >
                    {mainCategoryList.map((item, index) => (
                      <SelectItem key={index} onClick={() => setSelectedMainCategory(item)}>{item}</SelectItem>
                    ))}
                  </Select>

                  <Select
                  label="중분류 선택"
                  >
                    {selectedMainCategory &&
                      categoryList[selectedMainCategory]?.map((item :string) => (
                        <SelectItem key={item} onClick={() => setSelectedSubCategory(item)}>{item}</SelectItem>
                      ))}
                  </Select>
                  <Typography className="font-semibold">
                    개월 선택 (임산부 이외 중복 가능)
                  </Typography>
                  <div className="flex flex-wrap gap-3">
                    
                  {babyMonthList.map((month, index) => (
                    <Checkbox
                      key={index}
                      value={month}
                      checked={selectedMonthList.includes(index)}
                      onChange={() => handleMonthSelect(index + 1)}
                      // isDisabled={
                      //   (selectedMonthList.includes(1) && index !== 0) || // "임산부" 선택 시 다른 개월 비활성화
                      //   (index === 0 && selectedMonthList.length > 0) // 다른 개월 선택 시 "임산부" 비활성화
                      // }
                      isDisabled={
                        (index !== 0 && selectedMonthList.includes(1)) ||
                        (index === 0 && selectedMonthList.some((item) => item !== 1)) // "임산부"가 아닌 다른 개월 선택 시 "임산부" 비활성화
                      }
                    >
                      {month}
                    </Checkbox>
                  ))}
                  </div>

                  <Button onClick={()=>console.log(selectedMonthList)}>담긴 개월 조회</Button>
                
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" 
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
      </div>
    </div>
    <div className="mt-5 gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
      
    </div>
    {/* 대분류 카테고리 모달 */}
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">카테고리</ModalHeader>
              <ModalBody>
              <div className="flex flex-col gap-3">
      <CheckboxGroup
        label="대분류"
        color="primary"
        value={selected대분류}
        onValueChange={setSelected대분류}
      >
        <Checkbox value="유모차">유모차</Checkbox>
        <Checkbox value="수유용품">수유용품</Checkbox>
        <Checkbox value="기저귀">기저귀</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">선택됨: {selected대분류.join(", ")}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#5E9FF2] text-white" onPress={onClose}>
                  적용하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>

    </Modal>

    {/* 중분류 카테고리 모달 */}
    <Modal isOpen={중분류open} onOpenChange={handleOpen중분류} >
    <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">카테고리</ModalHeader>
              <ModalBody>
              <div className="flex flex-col gap-3">
      <CheckboxGroup
        label="중분류"
        color="primary"
        value={selected중분류}
        onValueChange={setSelected중분류}
      >
        <Checkbox value="디럭스형">디럭스형</Checkbox>
        <Checkbox value="절충형">절충형</Checkbox>
        <Checkbox value="일반">일반</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">선택됨: {selected중분류.join(", ")}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#5E9FF2] text-white" onClick={handleOpen중분류}>
                  적용하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>

    </Modal>
    {/* 개월 카테고리 모달 */}
    <Modal isOpen={개월수open} onOpenChange={handleOpen개월수} >
    <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">카테고리</ModalHeader>
              <ModalBody>
              <div className="flex flex-col gap-3">
      <CheckboxGroup
        label="개월 분류"
        color="primary"
        value={selected개월}
        onValueChange={setSelected개월}
      >
        <Checkbox value="1~3개월">1~3개월</Checkbox>
        <Checkbox value="4~6개월">4~6개월</Checkbox>
        <Checkbox value="7~9개월">7~9개월</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">선택됨: {selected개월.join(", ")}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#5E9FF2] text-white" onClick={handleOpen개월수}>
                  적용하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>

    </Modal>
    </>
  )
}