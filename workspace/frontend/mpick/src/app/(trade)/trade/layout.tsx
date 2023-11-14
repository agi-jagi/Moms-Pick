import NavBar from "@/app/_navbar/Navbar";

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
}
