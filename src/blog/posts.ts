import { parsePost, type Post } from '@/blog/parse-post';

const files = import.meta.glob<string>('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const slugs = new Set<string>();

const allPosts: Post[] = Object.entries(files).map(([path, raw]) => {
  const post = parsePost(path, raw);
  if (slugs.has(post.slug)) throw new Error(`Duplicate post slug "${post.slug}" (${path})`);
  slugs.add(post.slug);
  return post;
});

const posts: Post[] = allPosts.filter((post) => import.meta.env.DEV || !post.draft).sort((a, b) => b.date.localeCompare(a.date));

/** Published posts, newest first. Drafts are included only in dev. */
export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Unique tags across the visible posts, alphabetically sorted. */
export function getTags(): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort();
}
