import CoverNavbar from "../../_navbar/CoverNavbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CoverNavbar />
    </>
  );
}
