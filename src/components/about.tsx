import { useLocale } from '@/i18n/use-locale';

export function About() {
  const { messages } = useLocale();
  const { about } = messages;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
      <div className="reveal">
        <h2 className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">{about.title}</h2>
      </div>
      {about.paragraphs.map((paragraph, index) => (
        <p key={paragraph} className={`reveal text-text-muted text-base leading-relaxed sm:text-lg ${index === 0 ? 'mt-6' : 'mt-4'}`}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}
