"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const goBack = () => {
  const router = useRouter();
  return (
    <div>
      <IoMdArrowRoundBack
        size="30"
        style={{ position: "absolute" }}
        onClick={() => router.back()}
      />
    </div>
  );
};

export default goBack;
