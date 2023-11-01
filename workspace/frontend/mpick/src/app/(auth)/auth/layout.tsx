import CoverNavbar from "../../_navbar/coverNavbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CoverNavbar />
    </>
  );
}
