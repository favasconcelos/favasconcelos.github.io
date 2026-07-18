import { FloatingControl } from '@/components/floating-control';
import { SUPPORTED_LOCALES } from '@/i18n/types';
import { useLocale } from '@/i18n/use-locale';
import { cn } from '@/utils/cn';

export function LanguageSwitcher() {
  const { locale, setLocale, messages } = useLocale();

  return (
    <FloatingControl role="region" aria-label={messages.languageSwitcher.label}>
      <div className="bg-surface/90 border-border hover:border-accent flex h-11 items-center rounded-full border p-1 shadow-sm backdrop-blur-sm transition-colors duration-200">
        {SUPPORTED_LOCALES.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={active}
              className={cn(
                'flex h-9 items-center rounded-full px-3 text-xs font-medium transition-colors duration-200',
                active ? 'bg-accent/15 text-accent ring-1 ring-accent/50' : 'text-text-muted hover:bg-text/5 hover:text-text',
              )}
            >
              {code.toUpperCase()}
            </button>
          );
        })}
      </div>
    </FloatingControl>
  );
}
