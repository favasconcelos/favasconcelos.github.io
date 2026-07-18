import { en } from '@/i18n/locales/en';
import { es } from '@/i18n/locales/es';
import { pt } from '@/i18n/locales/pt';
import type { Locale, Translation } from '@/i18n/types';

export const MESSAGES: Record<Locale, Translation> = {
  en,
  pt,
  es,
};

export function messages(locale: Locale): Translation {
  return MESSAGES[locale];
}
