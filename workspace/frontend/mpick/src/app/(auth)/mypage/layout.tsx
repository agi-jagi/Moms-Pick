import NavBar from "@/app/_navbar/Navbar";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
}
