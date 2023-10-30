import Signup from "./signup";
import GoBack from "./goback";
import Search from "./addressSearch";

export default function Auth() {
  return (
    <div>
      <div
        style={{
          margin: "20px 30px",
        }}
      >
        <GoBack />
        <div className="flex justify-center">
          <p className="font-bold text-3xl">회원가입</p>
        </div>
        <hr style={{ borderTopWidth: "2px", marginTop: "10px" }} />
      </div>
      <Signup />
      {/* <Search /> */}
    </div>
  );
}
