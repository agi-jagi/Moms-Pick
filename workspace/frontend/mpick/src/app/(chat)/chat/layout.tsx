import NavBar from "@/app/_navbar/Navbar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
}
