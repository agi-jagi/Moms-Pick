// 'use client';

// import axios from "axios";
// import { useState } from "react";
// import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Input, Typography, Textarea } from "@material-tailwind/react";

// export function CreateForm() {

//   const [ open, setOpen ] = useState(false);
//   const handleOpen = () => setOpen(!open);
//   const [ categoryId, setCategoryId ] = useState(0);
//   const [ addressId, setAddressId ] = useState(0);
//   const [ title, setTitle ] = useState("");
//   const [ price, setPrice ] = useState(0);
//   const [ tradeExplain, setTradeExplain ] = useState("");
//   const [ startMonths, setStartMonths ] = useState([]);


//   return (
//     <>
//     <div>
//     <Dialog
//         size="xs"
//         open={open}
//         handler={handleOpen}
//         className="bg-transparent shadow-none"
//       >
//         <Card className="mx-auto w-full max-w-[24rem]">
//           <CardHeader
//             variant="gradient"
//             color="blue"
//             className="grid mb-4 h-28 place-items-center"
//           >
//             <Typography variant="h3" color="white">
//               판매글 등록
//             </Typography>
//           </CardHeader>
//           <CardBody className="flex flex-col gap-4">
//             <Input crossOrigin="anonymous" color="blue" label="판매글 제목" value={title} size="lg" onChange={(e) => setTitle(e.target.value)} />
//             <Input crossOrigin="anonymous" color="blue" label="판매 가격" value={price} size="lg" onChange={(e) => setPrice(Number(e.target.value)) }/>
//             <Input crossOrigin="anonymous" color="blue" label="대분류" value={price} size="lg" onChange={(e) => setPrice(Number(e.target.value)) }/>
//             <Input crossOrigin="anonymous" color="blue" label="중분류" value={price} size="lg" onChange={(e) => setPrice(Number(e.target.value)) }/>
//             <Input crossOrigin="anonymous" color="blue" label="개월 선택" value={price} size="lg" onChange={(e) => setPrice(Number(e.target.value)) }/>
            
//             <Textarea color="blue" label="판매글 내용" value={tradeExplain} size="lg" onChange={(e) => setTradeExplain(e.target.value)}/>
//           </CardBody>
//           <CardFooter className="pt-0">
//             <Button variant="gradient" onClick={() => {handleOpen(); }} fullWidth>
//               등록
//             </Button>
//           </CardFooter>
//         </Card>
//       </Dialog>
//     </div>
//     </>
//   )
// }