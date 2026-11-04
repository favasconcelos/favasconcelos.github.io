import { Link, useSearchParams } from 'react-router';

import { TagLink } from '@/modules/blog/components/tag-link';
import { formatPostDate } from '@/modules/blog/lib/format-post-date';
import { getPosts, getTags } from '@/modules/blog/lib/posts';
import { usePageMeta } from '@/shared/hooks/use-page-meta';
import { useLocale } from '@/shared/i18n/use-locale';
import { PageShell } from '@/shared/layout/page-shell';

export function BlogIndexPage() {
  const { messages } = useLocale();
  const { blog } = messages;
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  usePageMeta({ title: `${blog.title} — Felipe Vasconcelos`, description: blog.description, path: '/blog' });

  const posts = getPosts().filter((post) => !activeTag || post.tags.includes(activeTag));
  const tags = getTags();

  return (
    <PageShell>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{blog.title}</h1>
      <div className="from-accent via-vermillion mt-6 h-0.5 w-24 bg-linear-to-r to-transparent" />
      <p className="text-text-muted mt-6 text-base sm:text-lg">{blog.description}</p>
      <p className="text-text-muted mt-1 text-sm italic">{blog.languageNote}</p>

      {tags.length > 0 && (
        <nav aria-label="Tags" className="mt-8 flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <TagLink key={tag} tag={tag} active={tag === activeTag} />
          ))}
          {activeTag && (
            <Link to="/blog" className="text-text-muted hover:text-accent ml-2 text-xs underline underline-offset-4">
              {blog.clearFilter}
            </Link>
          )}
        </nav>
      )}

      {posts.length === 0 ? (
        <p className="text-text-muted mt-12">{blog.empty}</p>
      ) : (
        <ul className="mt-12 space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <div className="text-text-muted flex flex-wrap items-center gap-x-2 text-sm">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true" className="bg-accent/50 h-1 w-1 rounded-full" />
                  <span>{blog.readingTime.replace('{minutes}', String(post.readingTimeMinutes))}</span>
                  {post.draft && <span className="border-vermillion text-vermillion rounded-full border px-2 py-0.5 text-xs">{blog.draft}</span>}
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                  <Link to={`/blog/${post.slug}`} className="hover:text-accent transition-colors duration-200">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-text-muted mt-2 leading-relaxed">{post.summary}</p>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <TagLink key={tag} tag={tag} active={tag === activeTag} />
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
