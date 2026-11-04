import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { cn } from '@/utils/cn';

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);

const components: Components = {
  h1: ({ className, ...props }) => <h2 className={cn('text-text mt-12 mb-4 text-3xl font-bold tracking-tight', className)} {...props} />,
  h2: ({ className, ...props }) => <h2 className={cn('text-text mt-12 mb-4 text-2xl font-semibold tracking-tight', className)} {...props} />,
  h3: ({ className, ...props }) => <h3 className={cn('text-text mt-8 mb-3 text-xl font-semibold', className)} {...props} />,
  h4: ({ className, ...props }) => <h4 className={cn('text-accent/80 mt-6 mb-2 text-xs font-semibold tracking-wider uppercase', className)} {...props} />,
  p: ({ className, ...props }) => <p className={cn('text-text my-5 leading-relaxed', className)} {...props} />,
  a: ({ className, href, ...props }) => (
    <a
      href={href}
      className={cn('text-accent decoration-accent/40 hover:decoration-accent underline underline-offset-4 transition-colors duration-200', className)}
      {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => <ul className={cn('marker:text-accent/60 my-5 list-disc space-y-2 pl-6 [&.contains-task-list]:list-none [&.contains-task-list]:pl-0', className)} {...props} />,
  ol: ({ className, ...props }) => <ol className={cn('marker:text-accent/60 my-5 list-decimal space-y-2 pl-6', className)} {...props} />,
  li: ({ className, ...props }) => <li className={cn('text-text leading-relaxed', className)} {...props} />,
  input: ({ className, ...props }) => <input className={cn('accent-accent mr-2 align-middle', className)} {...props} />,
  blockquote: ({ className, ...props }) => <blockquote className={cn('border-accent/50 text-text-muted my-6 border-l-2 pl-5 italic', className)} {...props} />,
  hr: ({ className, ...props }) => <hr className={cn('border-accent/20 my-10 border-t', className)} {...props} />,
  img: ({ className, alt, ...props }) => <img alt={alt ?? ''} loading="lazy" decoding="async" className={cn('border-border my-6 h-auto max-w-full rounded-lg border', className)} {...props} />,
  strong: ({ className, ...props }) => <strong className={cn('text-text font-semibold', className)} {...props} />,
  code: ({ className, ...props }) => <code className={cn('bg-surface border-border rounded border px-1.5 py-0.5 font-mono text-[0.875em]', className)} {...props} />,
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'bg-surface border-border my-6 overflow-x-auto rounded-lg border p-4 text-sm leading-relaxed [&>code]:rounded-none [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em]',
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => <th className={cn('border-border text-text border-b-2 px-3 py-2 text-left font-semibold', className)} {...props} />,
  td: ({ className, ...props }) => <td className={cn('border-border text-text-muted border-b px-3 py-2', className)} {...props} />,
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
