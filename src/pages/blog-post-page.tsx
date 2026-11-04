import { Link, useParams } from 'react-router';

import { formatPostDate } from '@/blog/format-post-date';
import { type Post } from '@/blog/parse-post';
import { getPost } from '@/blog/posts';
import { Markdown } from '@/components/markdown';
import { PageShell } from '@/components/page-shell';
import { TagLink } from '@/components/tag-link';
import { usePageMeta } from '@/hooks/use-page-meta';
import { useLocale } from '@/i18n/use-locale';
import { NotFoundPage } from '@/pages/not-found-page';

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = getPost(slug);

  if (!post) return <NotFoundPage />;

  return <PostView post={post} />;
}

function PostView({ post }: { post: Post }) {
  const { messages } = useLocale();
  const { blog } = messages;

  usePageMeta({ title: `${post.title} — Felipe Vasconcelos`, description: post.summary, path: `/blog/${post.slug}`, type: 'article' });

  return (
    <PageShell>
      <Link to="/blog" className="text-text-muted hover:text-accent text-sm transition-colors duration-200">
        ← {blog.backToPosts}
      </Link>

      <article className="mt-8" lang="en">
        <header>
          <div className="text-text-muted flex flex-wrap items-center gap-x-2 text-sm">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true" className="bg-accent/50 h-1 w-1 rounded-full" />
            <span>{blog.readingTime.replace('{minutes}', String(post.readingTimeMinutes))}</span>
            {post.draft && <span className="border-vermillion text-vermillion rounded-full border px-2 py-0.5 text-xs">{blog.draft}</span>}
          </div>
          <h1 className="mt-2 text-3xl leading-[1.15] font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <div className="from-accent via-vermillion mt-6 h-0.5 w-24 bg-linear-to-r to-transparent" />
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagLink key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>
        <div className="mt-6">
          <Markdown>{post.body}</Markdown>
        </div>
      </article>
    </PageShell>
  );
}
