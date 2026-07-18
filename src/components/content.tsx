import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Content() {
  const containerRef = useScrollReveal();

  return (
    <main ref={containerRef} className="w-full">
      <Hero />
      <div className="w-full border-t border-accent/20" />
      <About />
      <div className="max-w-3xl mx-auto border-t border-accent/20" />
      <Experience />
      <div className="max-w-3xl mx-auto border-t border-accent/20" />
      <Skills />
      <Contact />
    </main>
  );
}
