import { parse } from 'yaml';
import { z } from 'zod';

const WORDS_PER_MINUTE = 200;
const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/;

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(false),
});

export type Post = {
  slug: string;
  title: string;
  /** ISO calendar date, `YYYY-MM-DD`. */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  body: string;
  readingTimeMinutes: number;
};

/**
 * Derives the URL slug from a markdown file path, dropping the directory,
 * the `.md` extension and an optional `YYYY-MM-DD-` prefix.
 */
export function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? path;
  return filename.replace(/\.md$/, '').replace(DATE_PREFIX, '');
}

/**
 * Parses a markdown file with YAML frontmatter into a validated `Post`.
 * Throws with the offending path when the frontmatter is invalid.
 */
export function parsePost(path: string, raw: string): Post {
  const match = FRONTMATTER.exec(raw);
  if (!match) throw new Error(`Missing frontmatter in ${path}`);

  const [, yaml, body] = match;
  const parsed = frontmatterSchema.safeParse(parse(yaml));

  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${path}: ${z.prettifyError(parsed.error)}`);
  }

  const { title, date, summary, tags, draft } = parsed.data;
  const words = body.trim().split(/\s+/).length;

  return {
    slug: slugFromPath(path),
    title,
    date: date.toISOString().slice(0, 10),
    summary,
    tags,
    draft,
    body,
    readingTimeMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}
