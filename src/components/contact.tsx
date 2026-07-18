import Icon, { IconType } from "@/components/icon/icon";

const LINKS = [
  {
    href: "https://www.linkedin.com/in/felipevasconcelos",
    type: IconType.LINKEDIN,
    label: "LinkedIn",
  },
  { href: "https://github.com/favasconcelos", type: IconType.GITHUB, label: "GitHub" },
  { href: "mailto:f@avasconcelos.com", type: IconType.EMAIL, label: "Email" },
  {
    href: "https://drive.google.com/file/d/1u4MOtXESS_GmHKQyBbY5wTmtfn_D4Moh/view?usp=sharing",
    type: IconType.RESUME,
    label: "Resume",
  },
] as const;

export default function Contact() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="reveal">
          <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Get in Touch
          </h2>
        </div>
        <p className="reveal mt-4 text-text-muted text-sm">
          <a
            href="mailto:f@avasconcelos.com"
            className="text-text hover:text-accent transition-colors duration-200 underline underline-offset-4 decoration-border hover:decoration-accent"
          >
            f@avasconcelos.com
          </a>
        </p>
        <div className="reveal mt-8 flex flex-wrap gap-4">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-200 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:fill-current"
            >
              <Icon type={link.type} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} Felipe Vasconcelos
      </div>
    </footer>
  );
}
