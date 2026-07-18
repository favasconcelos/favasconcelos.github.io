import { useLocale } from '@/i18n/use-locale';

export function Skills() {
  const { messages } = useLocale();
  const { skills } = messages;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
      <div className="reveal">
        <h2 className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">{skills.title}</h2>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {skills.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="reveal">
            <h3 className="text-text mb-2 text-sm font-medium">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-text-muted bg-surface border-border hover:border-accent/40 hover:text-accent rounded border px-2.5 py-1 text-xs font-medium transition-colors duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
