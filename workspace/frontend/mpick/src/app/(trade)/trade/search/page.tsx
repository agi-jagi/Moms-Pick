'use client';

import { useTradeStore } from "@/store/TradeStore";
import { useEffect, useState } from "react";
import { Chip, Card, CardFooter, Image, CardBody, Button,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  CheckboxGroup, Checkbox } from "@nextui-org/react";
import FilterIcon from "./FilterIcon";
import { BsChevronDown } from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";


export default function Search() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selected대분류, setSelected대분류] = useState([]);

  const [중분류open, set중분류Open] = useState(false);
  const handleOpen중분류 = () => set중분류Open(!중분류open);
  const [selected중분류, setSelected중분류] = useState([]);

  const [개월수open, set개월수Open] = useState(false);
  const handleOpen개월수 = () => set개월수Open(!개월수open);
  const [selected개월, setSelected개월] = useState([]);
  

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
    {
      title: "유모차",
      img: "/nezko.jfif",
      price: "₩ 157,000",
    },
    {
      title: "외출용품",
      img: "/nezko.jfif",
      price: "₩ 80,000",
    },
    {
      title: "의류",
      img: "/nezko.jfif",
      price: "₩ 75,000",
    },
    {
      title: "임산부",
      img: "/nezko.jfif",
      price: "₩ 122,000",
    },
  ];



  return (
    <>
      <div>
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
          startContent={<BiSolidMessageSquareAdd />}
          radius="full" 
          className="top-3 right-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg"
        >
          판매글 등록
        </Button>
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
        onValueChange={() => {setSelected대분류}}
      >
        <Checkbox value="유모차">유모차</Checkbox>
        <Checkbox value="수유용품">수유용품</Checkbox>
        <Checkbox value="기저귀">기저귀</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">선택됨: {selected대분류.join(", ")}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
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
        onValueChange={() => {setSelected중분류}}
      >
        <Checkbox value="디럭스형">디럭스형</Checkbox>
        <Checkbox value="절충형">절충형</Checkbox>
        <Checkbox value="일반">일반</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">선택됨: {selected중분류.join(", ")}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleOpen중분류}>
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
        onValueChange={() => {setSelected개월}}
      >
        <Checkbox value="1~3개월">1~3개월</Checkbox>
        <Checkbox value="4~6개월">4~6개월</Checkbox>
        <Checkbox value="7~9개월">7~9개월</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500 text-small">선택됨: {selected개월.join(", ")}</p>
    </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleOpen개월수}>
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