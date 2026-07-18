import { SUPPORTED_LOCALES } from '@/i18n/types';
import { useLocale } from '@/i18n/use-locale';
import { cn } from '@/utils/cn';

export function LanguageSwitcher() {
  const { locale, setLocale, messages } = useLocale();

  return (
    <div
      className="bg-surface/90 border-border hover:border-accent flex h-9 items-center rounded-full border p-0.5 shadow-sm backdrop-blur-sm transition-colors duration-200"
      role="region"
      aria-label={messages.languageSwitcher.label}
    >
      {SUPPORTED_LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={cn(
              'flex h-full items-center rounded-full px-2.5 text-xs font-medium transition-colors duration-200',
              active ? 'bg-accent/15 text-accent ring-1 ring-accent/50' : 'text-text-muted hover:bg-text/5 hover:text-text',
            )}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
