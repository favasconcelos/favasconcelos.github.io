import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Experience } from '@/components/experience';
import { Hero } from '@/components/hero';
import { LanguageSwitcher } from '@/components/language-switcher';
import { SectionDivider } from '@/components/section-divider';
import { Skills } from '@/components/skills';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useLocale } from '@/i18n/use-locale';

export function Content() {
  const containerRef = useScrollReveal();
  const { messages } = useLocale();

  return (
    <>
      <a
        href="#main"
        className="focus:bg-accent focus:text-bg focus:ring-accent/50 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:font-medium focus:ring-2 focus:outline-none"
      >
        {messages.skipToContent}
      </a>
      <LanguageSwitcher />
      <main ref={containerRef} className="w-full overflow-x-hidden" id="main">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
