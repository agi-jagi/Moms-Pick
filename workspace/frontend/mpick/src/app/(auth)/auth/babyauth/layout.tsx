import GoBack from "../GoBack";
import NavBar from "@/app/_navbar/Navbar";

export default function BabyAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <div
          style={{
            margin: "20px 30px",
          }}
        >
          <GoBack />
          <div className="flex justify-center">
            <p className="font-bold text-3xl">아이 정보 입력</p>
          </div>
          <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
        </div>
      </div>

      {children}
    </>
  );
}
