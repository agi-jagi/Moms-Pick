import GoBack from "../goback";

export default function BabyAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
      </div>

      {children}
    </>
  );
}
