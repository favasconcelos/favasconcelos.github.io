import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { messages } from '@/i18n/messages';
import { detectLocale, isLocale, type Locale, type Translation } from '@/i18n/types';

const STORAGE_KEY = 'preferred-language';

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Translation;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function resolveInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;

  return detectLocale();
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, messages: messages(locale) }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
