import Icon, { IconType } from '@/components/icon/icon';

const LINKS = [
  {
    href: 'https://www.linkedin.com/in/felipevasconcelos',
    type: IconType.LINKEDIN,
    label: 'LinkedIn',
  },
  { href: 'https://github.com/favasconcelos', type: IconType.GITHUB, label: 'GitHub' },
  { href: 'mailto:f@avasconcelos.com', type: IconType.EMAIL, label: 'Email' },
  {
    href: 'https://drive.google.com/file/d/1u4MOtXESS_GmHKQyBbY5wTmtfn_D4Moh/view?usp=sharing',
    type: IconType.RESUME,
    label: 'Resume',
  },
] as const;

export default function Contact() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="reveal">
          <h2 className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Get in Touch</h2>
        </div>
        <p className="reveal text-text-muted mt-4 text-sm">
          <a href="mailto:f@avasconcelos.com" className="text-text hover:text-accent decoration-border hover:decoration-accent underline underline-offset-4 transition-colors duration-200">
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
              className="text-text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors duration-200 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current"
            >
              <Icon type={link.type} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="border-border text-text-muted border-t py-6 text-center text-xs">© {new Date().getFullYear()} Felipe Vasconcelos</div>
    </footer>
  );
}
