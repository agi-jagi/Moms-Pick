import GoBack from "../auth/GoBack";
import Myfamily from "./MyFamily";
import InfoList from "./InfoList";

export default function mypage() {
  return (
    <div>
      <div
        style={{
          margin: "20px 30px",
        }}
      >
        <GoBack />
        <div className="flex justify-center">
          <p className="font-bold text-3xl">마이페이지</p>
        </div>
      </div>
      <hr style={{ borderTopWidth: "2px" }} />
      <div style={{ padding: "20px 0", backgroundColor: "rgb(247, 247, 247)", height: "81vh" }}>
        <Myfamily />
        <InfoList />
      </div>
      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </div>
  );
}
