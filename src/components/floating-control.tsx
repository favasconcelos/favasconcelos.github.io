import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

type FloatingControlProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  top?: string;
};

export function FloatingControl({ children, className, top = 'top-4', ...props }: FloatingControlProps) {
  return (
    <div className={cn('fixed right-4 z-50', top, className)} {...props}>
      {children}
    </div>
  );
}
