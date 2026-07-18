import { useMemo } from 'react';

import { useLocale } from '@/i18n/use-locale';

const HERO_IMAGES = [
  { webp: '/frevo.webp', jpg: '/frevo.jpg' },
  { webp: '/frevo2.webp', jpg: '/frevo2.jpg' },
] as const;

export function Hero() {
  const image = useMemo(() => HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)], []);
  const { messages } = useLocale();
  const { hero } = messages;

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Frevo background — faded, atmospheric, randomly selected */}
      <picture className="absolute inset-0" aria-hidden="true">
        <source srcSet={image.webp} type="image/webp" />
        <img src={image.jpg} alt="" width="1920" height="1080" className="h-full w-full object-cover opacity-[0.30] dark:opacity-[0.12]" loading="eager" decoding="async" />
      </picture>
      {/* Gradient overlay for text readability */}
      <div className="from-bg/60 via-bg/40 to-bg dark:from-bg/60 dark:via-bg/40 absolute inset-0 bg-gradient-to-b" aria-hidden="true" />

      <div className="relative z-10">
        <p className="reveal text-text-muted mb-4 text-sm tracking-widest uppercase">{hero.role}</p>
        <h1 className="reveal text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">Felipe Vasconcelos</h1>
        <div className="reveal from-accent via-vermillion mt-6 h-[2px] w-24 bg-gradient-to-r to-transparent" />
        <p className="reveal text-text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg">{hero.tagline}</p>
        <p className="reveal text-accent dark:text-accent/70 mt-3 text-sm italic">{hero.quote}</p>
        <div className="reveal text-text-muted mt-8 flex items-center justify-center gap-2 text-sm">
          <span>{hero.location}</span>
          <span className="bg-accent/50 h-1 w-1 rounded-full" />
          <span>{hero.origin}</span>
        </div>
      </div>
    </section>
  );
}
