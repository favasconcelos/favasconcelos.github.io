import { About } from '@/modules/home/components/about';
import { Contact } from '@/modules/home/components/contact';
import { Experience } from '@/modules/home/components/experience';
import { Hero } from '@/modules/home/components/hero';
import { SectionDivider } from '@/modules/home/components/section-divider';
import { Skills } from '@/modules/home/components/skills';
import { useScrollReveal } from '@/modules/home/hooks/use-scroll-reveal';
import { useLocale } from '@/shared/i18n/use-locale';

export function HomePage() {
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
