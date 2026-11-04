import { Link, useLocation } from 'react-router';

import { useLocale } from '@/i18n/use-locale';

export function BlogNavLink() {
  const { pathname } = useLocation();
  const { messages } = useLocale();
  const onHome = pathname === '/';
  const label = onHome ? messages.blog.navBlog : messages.blog.navHome;

  return (
    <Link
      to={onHome ? '/blog' : '/'}
      className="border-border bg-surface/90 text-text hover:border-accent hover:text-accent flex h-9 items-center rounded-full border px-4 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors duration-200"
    >
      {label}
    </Link>
  );
}
