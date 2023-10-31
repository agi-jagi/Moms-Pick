import TopNavBar from "./TopNavBar";

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <TopNavBar />
    {children}

    </>
  );
}