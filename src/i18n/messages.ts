import type { Locale, Translation } from '@/i18n/types';

const loaders: Record<Locale, () => Promise<Translation>> = {
  en: () => import('@/i18n/locales/en').then((m) => m.en),
  br: () => import('@/i18n/locales/br').then((m) => m.br),
  es: () => import('@/i18n/locales/es').then((m) => m.es),
};

const cache = new Map<Locale, Translation>();

export async function preloadLocale(locale: Locale): Promise<Translation> {
  const cached = cache.get(locale);
  if (cached) return cached;

  const loader = loaders[locale];
  const msgs = await loader();
  cache.set(locale, msgs);
  return msgs;
}
