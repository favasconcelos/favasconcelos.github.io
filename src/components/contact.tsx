import { Icon, IconType } from '@/components/icon';
import { Section } from '@/components/section';
import { useLocale } from '@/i18n/use-locale';

const LINK_CONFIG = [
  { href: 'https://www.linkedin.com/in/felipevasconcelos', type: IconType.LINKEDIN, key: 'linkedIn' as const },
  { href: 'https://github.com/favasconcelos', type: IconType.GITHUB, key: 'gitHub' as const },
  { href: 'mailto:f@avasconcelos.com', type: IconType.EMAIL, key: 'email' as const },
  { href: 'https://drive.google.com/file/d/1u4MOtXESS_GmHKQyBbY5wTmtfn_D4Moh/view?usp=sharing', type: IconType.RESUME, key: 'resume' as const },
];

export function Contact() {
  const { messages } = useLocale();
  const { contact } = messages;
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <Section as="div" title={contact.title} className="py-16">
        <p className="reveal text-text-muted mt-4 text-sm">
          <a href="mailto:f@avasconcelos.com" className="text-text hover:text-accent decoration-border hover:decoration-accent underline underline-offset-4 transition-colors duration-200">
            f@avasconcelos.com
          </a>
        </p>
        <div className="reveal mt-8 flex flex-wrap gap-4">
          {LINK_CONFIG.map((link) => {
            const label = contact.links[link.key];
            return (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors duration-200 [&>svg]:h-5 [&>svg]:w-5"
              >
                <Icon type={link.type} />
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </Section>
      <div className="border-border text-text-muted border-t py-6 text-center text-xs">{contact.copyright.replace('{year}', String(year))}</div>
    </footer>
  );
}
