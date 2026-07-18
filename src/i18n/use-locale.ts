import { useI18n } from '@/i18n/context';

export function useLocale() {
  const { locale, setLocale, messages } = useI18n();
  return { locale, setLocale, messages };
}
