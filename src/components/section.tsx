import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

type SectionTag = 'section' | 'div';

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  containIntrinsicSize?: string;
  as?: SectionTag;
};

export function Section({ title, children, className, containIntrinsicSize, as = 'section' }: SectionProps) {
  const Container = as;

  return (
    <Container className={cn('mx-auto max-w-3xl px-6 py-16', className)} style={containIntrinsicSize ? { contentVisibility: 'auto', containIntrinsicSize } : undefined}>
      <div className="reveal">
        <h2 className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">{title}</h2>
      </div>
      {children}
    </Container>
  );
}
