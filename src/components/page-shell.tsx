import { type ReactNode } from 'react';

import { useLocale } from '@/i18n/use-locale';

export function PageShell({ children }: { children: ReactNode }) {
  const { messages } = useLocale();
  const year = new Date().getFullYear();

  return (
    <>
      <a
        href="#main"
        className="focus:bg-accent focus:text-bg focus:ring-accent/50 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:font-medium focus:ring-2 focus:outline-none"
      >
        {messages.skipToContent}
      </a>
      <main id="main" className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        {children}
      </main>
      <footer className="border-border text-text-muted border-t py-6 text-center text-xs">{messages.contact.copyright.replace('{year}', String(year))}</footer>
    </>
  );
}
