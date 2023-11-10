import NavBar from "@/app/_navbar/Navbar";

export default function ParentingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavBar />
      <div style={{ height: "77px", position: "sticky", bottom: "0" }}></div>
    </>
  );
}
