import { Section } from '@/components/section';
import { useLocale } from '@/i18n/use-locale';
import { cn } from '@/utils/cn';

export function Experience() {
  const { messages } = useLocale();
  const { experience } = messages;

  return (
    <Section title={experience.title} containIntrinsicSize="0 800px">
      <div className="mt-8 space-y-12">
        {experience.roles.map((role, i) => (
          <article key={role.company} className={cn(i % 2 === 0 ? 'reveal-left' : 'reveal-right')}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-text text-lg font-semibold">{role.company}</h3>
              <span className="text-text-muted text-sm whitespace-nowrap italic">{role.period}</span>
            </div>
            <p className="text-text-muted mt-0.5 text-sm">
              {role.title} · {role.location}
            </p>

            {role.sections ? (
              <div className="mt-4 space-y-4">
                {role.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4 className="text-accent/70 mb-1.5 text-xs font-semibold tracking-wider uppercase">{section.heading}</h4>
                    <ul className="space-y-1.5">
                      {section.items.map((item, itemIndex) => (
                        <HighlightItem key={itemIndex} text={item} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {role.highlights?.map((h, highlightIndex) => (
                  <HighlightItem key={highlightIndex} text={h} />
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

function HighlightItem({ text }: { text: string }) {
  return (
    <li className="text-text-muted before:bg-accent/40 relative pl-4 text-sm leading-relaxed before:absolute before:top-2.25 before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:content-['']">
      {text}
    </li>
  );
}
