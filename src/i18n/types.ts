export const SUPPORTED_LOCALES = ['en', 'br', 'es'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  sections?: Array<{
    heading: string;
    items: string[];
  }>;
  highlights?: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Translation = {
  meta: {
    description: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  skipToContent: string;
  hero: {
    role: string;
    tagline: string;
    quote: string;
    location: string;
    origin: string;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  experience: {
    title: string;
    roles: Role[];
  };
  skills: {
    title: string;
    groups: SkillGroup[];
  };
  contact: {
    title: string;
    links: {
      linkedIn: string;
      gitHub: string;
      email: string;
      resume: string;
    };
    copyright: string;
  };
  languageSwitcher: {
    label: string;
    languages: Record<Locale, string>;
  };
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale);
}

export function normalizeLocale(value: string): Locale {
  const normalized = value.split('-')[0].toLowerCase();
  const locale = normalized === 'pt' ? 'br' : normalized;
  return isLocale(locale) ? locale : 'en';
}

export function detectLocale(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const locale = normalizeLocale(language);
    if (isLocale(locale)) return locale;
  }
  return 'en';
}
