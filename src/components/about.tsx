import { Section } from '@/components/section';
import { useLocale } from '@/i18n/use-locale';
import { cn } from '@/utils/cn';

export function About() {
  const { messages } = useLocale();
  const { about } = messages;

  return (
    <Section title={about.title} containIntrinsicSize="0 500px">
      {about.paragraphs.map((paragraph, index) => (
        <p key={index} className={cn('reveal text-text-muted text-base leading-relaxed sm:text-lg', index === 0 ? 'mt-6' : 'mt-4')}>
          {paragraph}
        </p>
      ))}
    </Section>
  );
}
