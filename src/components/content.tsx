import About from '@/components/about';
import Contact from '@/components/contact';
import Experience from '@/components/experience';
import Hero from '@/components/hero';
import Skills from '@/components/skills';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export default function Content() {
  const containerRef = useScrollReveal();

  return (
    <main ref={containerRef} className="w-full overflow-x-hidden" id="main">
      <Hero />
      <div className="border-accent/20 w-full border-t" />
      <About />
      <div className="border-accent/20 mx-auto max-w-3xl border-t" />
      <Experience />
      <div className="border-accent/20 mx-auto max-w-3xl border-t" />
      <Skills />
      <Contact />
    </main>
  );
}
