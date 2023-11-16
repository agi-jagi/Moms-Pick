"use client";

import instance from "@/app/_config/axios";
import Swal from "sweetalert2";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Logout = () => {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid grey",
        marginTop: "10px",
        paddingTop: "10px",
      }}
      onClick={() => {
        instance
          .post("/api/users/logout")
          .then((res) => {
            if (res.data.success) {
              Toast.fire({
                icon: "success",
                title: "로그아웃 되었습니다",
              });
              localStorage.removeItem("accessToken");
              router.push("/");
            }
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: "네트워크 에러",
            });
          });
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="font-bold text-base">로그아웃</p>
      </div>
      <IoIosArrowForward size="30" />
    </div>
  );
};

export default Logout;
