import { Link } from 'react-router';

import { PageShell } from '@/components/page-shell';
import { usePageMeta } from '@/hooks/use-page-meta';
import { useLocale } from '@/i18n/use-locale';

export function NotFoundPage() {
  const { messages } = useLocale();
  const { blog } = messages;

  usePageMeta({ title: `${blog.notFoundTitle} — Felipe Vasconcelos`, description: blog.notFoundText, path: '/404' });

  return (
    <PageShell>
      <h1 className="text-3xl font-bold tracking-tight">{blog.notFoundTitle}</h1>
      <p className="text-text-muted mt-4">{blog.notFoundText}</p>
      <Link to="/" className="text-accent decoration-accent/40 hover:decoration-accent mt-8 inline-block text-sm underline underline-offset-4">
        {blog.backHome}
      </Link>
    </PageShell>
  );
}
