export default function Borders() {
  return (
    <>
      <div className="hidden md:block fixed top-0 left-0 right-0 h-4 bg-[#201e1b] z-10" />
      <div className="hidden md:block fixed bottom-0 left-0 right-0 h-4 bg-[#201e1b] z-10" />
      <div className="hidden md:block fixed top-0 left-0 w-4 h-full bg-[#201e1b] z-10" />
      <div className="hidden md:block fixed top-0 right-0 w-4 h-full bg-[#201e1b] z-10" />
    </>
  );
}
