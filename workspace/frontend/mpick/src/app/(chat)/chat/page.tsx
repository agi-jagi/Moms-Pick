import GoBack from "../../(auth)/auth/GoBack";
import ChatListCard from "./ChatListCard";

export default function chat() {
  return (
    <div>
      <div
        style={{
          margin: "20px 30px",
        }}
      >
        <GoBack />
        <div className="flex justify-center">
          <p className="font-bold text-3xl">채팅 목록</p>
        </div>
      </div>
      <hr style={{ borderTopWidth: "2px" }} />
      <ChatListCard />
    </div>
  );
}
