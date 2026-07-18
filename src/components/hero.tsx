import { useMemo } from "react";

const HERO_IMAGES = [
  { webp: "/frevo.webp", jpg: "/frevo.jpg" },
  { webp: "/frevo2.webp", jpg: "/frevo2.jpg" },
] as const;

export default function Hero() {
  const image = useMemo(() => HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)], []);

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden">
      {/* Frevo background — faded, atmospheric, randomly selected */}
      <picture className="absolute inset-0" aria-hidden="true">
        <source srcSet={image.webp} type="image/webp" />
        <img
          src={image.jpg}
          alt=""
          width="1920"
          height="1080"
          className="w-full h-full object-cover opacity-[0.12]"
          loading="eager"
          decoding="async"
        />
      </picture>
      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <p className="reveal text-text-muted text-sm tracking-widest uppercase mb-4">
          Senior Software Engineer
        </p>
        <h1 className="reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          Felipe Vasconcelos
        </h1>
        <div className="reveal mt-6 w-24 h-[2px] bg-gradient-to-r from-accent via-vermillion to-transparent" />
        <p className="reveal mt-6 text-text-muted text-base sm:text-lg max-w-xl leading-relaxed">
          Frontend Chapter Lead at adidas. Building micro-frontend platforms, AI-powered developer
          tools, and cloud-native systems.
        </p>
        <p className="reveal mt-3 text-sm italic text-accent/70">
          From the drums of Recife to the DOM — same rhythm, different stage.
        </p>
        <div className="reveal mt-8 flex items-center justify-center gap-2 text-sm text-text-muted">
          <span>Zaragoza, Spain</span>
          <span className="w-1 h-1 rounded-full bg-accent/50" />
          <span>Originally from Recife, Brazil</span>
        </div>
      </div>
    </section>
  );
}
