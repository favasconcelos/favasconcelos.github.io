import Icon, { IconType } from "@/components/icon/icon";

const LINKS = [
  {
    href: "https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit",
    type: IconType.RESUME,
  },
  {
    href: "https://www.linkedin.com/in/felipevasconcelos",
    type: IconType.LINKEDIN,
  },
  { href: "https://github.com/favasconcelos", type: IconType.GITHUB },
  { href: "skype:vasconcelos90.felipe?call", type: IconType.SKYPE },
  { href: "https://twitter.com/favasconcelos", type: IconType.TWITTER },
  { href: "mailto:f@avasconcelos.com", type: IconType.EMAIL },
];

export default function Social() {
  return (
    <div className="flex flex-row justify-center gap-8 max-md:flex-col max-md:gap-2 max-md:mt-4 max-[767px]:landscape:flex-row max-[767px]:landscape:flex-wrap">
      {LINKS.map((link, i) => {
        const key = `link-${i}`;
        return (
          <a
            key={key}
            href={link.href}
            title={link.type}
            target="_blank"
            rel="noopener noreferrer"
            className="pb-1 border-b-2 border-[#4a4a4a] [&>svg]:w-6 [&>svg]:h-6 [&>svg]:fill-[#4a4a4a] hover:border-[#979797] hover:[&>svg]:fill-[#979797] max-md:w-full max-md:p-2 max-md:pb-2 max-md:border max-md:border-[#4a4a4a] max-md:hover:border-white max-md:[&>svg]:fill-white max-md:hover:[&>svg]:fill-white max-[767px]:landscape:w-[calc(50%-0.5rem)]"
          >
            <Icon type={link.type} />
          </a>
        );
      })}
    </div>
  );
}
