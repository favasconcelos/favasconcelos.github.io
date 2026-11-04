import { useI18n } from '@/shared/i18n/context';

export function useLocale() {
  const { locale, setLocale, messages } = useI18n();
  return { locale, setLocale, messages };
}
