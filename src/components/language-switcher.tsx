import { SUPPORTED_LOCALES } from '@/i18n/types';
import { useLocale } from '@/i18n/use-locale';

export function LanguageSwitcher() {
  const { locale, setLocale, messages } = useLocale();

  return (
    <div className="fixed top-4 right-4 z-50" role="region" aria-label={messages.languageSwitcher.label}>
      <div className="bg-surface border-border flex rounded-full border p-1 shadow-sm">
        {SUPPORTED_LOCALES.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={active}
              className={`text-text-muted hover:text-text rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 ${active ? 'bg-accent text-bg hover:text-bg' : ''}`}
            >
              {code.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
