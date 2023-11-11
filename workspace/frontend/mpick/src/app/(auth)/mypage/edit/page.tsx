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
          <p className="font-bold text-3xl">내 정보 수정</p>
        </div>
      </div>
      <hr style={{ borderTopWidth: "2px" }} />
    </div>
  );
}
