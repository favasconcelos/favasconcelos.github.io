import imgProfile from "@/assets/photos/profile.jpg";

export default function Profile() {
  return (
    <img
      src={imgProfile}
      alt="Felipe Vasconcelos"
      className="hidden md:block w-auto max-w-[300px] lg:max-w-full h-full object-cover border-l border-[#201e1b]"
    />
  );
}
