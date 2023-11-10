import GoBack from "../../auth/GoBack";

export default function EditMyInfo() {
  return (
    <div>
      <div
        style={{
          margin: "20px 30px",
        }}
      >
        <GoBack />
        <div className="flex justify-center">
          <p className="font-bold text-3xl">위치 변경</p>
        </div>
      </div>
      <hr style={{ borderTopWidth: "2px" }} />
      아직 안넣음
    </div>
  );
}
