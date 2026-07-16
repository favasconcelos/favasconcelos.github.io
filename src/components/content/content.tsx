import Profile from "@/components/profile/profile";
import Info from "@/components/info/info";

export default function Content() {
  return (
    <div className="flex flex-row w-full h-full bg-white m-2 max-md:m-0 max-md:bg-[#201e1b] max-md:text-white">
      <Info />
      <Profile />
    </div>
  );
}
