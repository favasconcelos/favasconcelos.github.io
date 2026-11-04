import { Section } from '@/modules/home/components/section';
import { useLocale } from '@/shared/i18n/use-locale';
import { cn } from '@/shared/utils/cn';

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
