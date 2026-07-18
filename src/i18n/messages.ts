import { br } from '@/i18n/locales/br';
import { en } from '@/i18n/locales/en';
import { es } from '@/i18n/locales/es';
import type { Locale, Translation } from '@/i18n/types';

export const MESSAGES: Record<Locale, Translation> = {
  en,
  br,
  es,
};

export function messages(locale: Locale): Translation {
  return MESSAGES[locale];
}
