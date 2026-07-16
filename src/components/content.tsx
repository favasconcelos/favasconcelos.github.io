import Profile from "@/components/profile";
import Info from "@/components/info";

export default function Content() {
  return (
    <div className="flex flex-row flex-1 bg-white m-2 overflow-hidden max-md:m-0 max-md:bg-[#201e1b] max-md:text-white">
      <Info />
      <Profile />
    </div>
  );
}
