import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import type { Plugin } from 'vite';

import { parsePost, type Post } from '../src/blog/parse-post';

const SITE_URL = 'https://avasconcelos.com';
const SITE_TITLE = 'Felipe Vasconcelos — Blog';
const SITE_DESCRIPTION = 'Work in progress, weekly findings, packages and ideas worth sharing.';

const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

function loadPublishedPosts(postsDir: string): Post[] {
  return readdirSync(postsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => parsePost(file, readFileSync(join(postsDir, file), 'utf8')))
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function buildRss(posts: Post[]): string {
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function buildSitemap(posts: Post[]): string {
  const latest = posts[0]?.date;
  const entries = [{ loc: `${SITE_URL}/`, lastmod: undefined }, { loc: `${SITE_URL}/blog`, lastmod: latest }, ...posts.map((post) => ({ loc: `${SITE_URL}/blog/${post.slug}`, lastmod: post.date }))];

  const urls = entries.map(({ loc, lastmod }) => `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/** Emits `rss.xml` and `sitemap.xml` at build time from the published markdown posts. */
export function blogFeedPlugin(): Plugin {
  let postsDir = '';

  return {
    name: 'blog-feed',
    apply: 'build',
    configResolved(config) {
      postsDir = resolve(config.root, 'src/content/posts');
    },
    generateBundle() {
      const posts = loadPublishedPosts(postsDir);
      this.emitFile({ type: 'asset', fileName: 'rss.xml', source: buildRss(posts) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(posts) });
    },
  };
}
