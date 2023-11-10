import NavBar from "@/app/_navbar/Navbar";

export default function ParentingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
}
