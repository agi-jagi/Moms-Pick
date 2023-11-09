import TopNavBar from "./TopNavBar";
import NavBar from "@/app/_navbar/Navbar";
import Server from "../../_chatting/Server";

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNavBar />
      <Server />
      {children}
      <NavBar />
    </>
  );
}
