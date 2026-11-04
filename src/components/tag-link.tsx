import { Link } from 'react-router';

import { cn } from '@/utils/cn';

type TagLinkProps = {
  tag: string;
  active?: boolean;
};

export function TagLink({ tag, active = false }: TagLinkProps) {
  return (
    <Link
      to={`/blog?tag=${encodeURIComponent(tag)}`}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'rounded-full border px-2.5 py-0.5 text-xs transition-colors duration-200',
        active ? 'border-accent bg-accent/15 text-accent' : 'border-border text-text-muted hover:border-accent hover:text-accent',
      )}
    >
      {tag}
    </Link>
  );
}
