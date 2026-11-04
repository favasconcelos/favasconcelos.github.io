import { LanguageSwitcher } from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { BlogNavLink } from '@/shared/layout/blog-nav-link';
import { FloatingControl } from '@/shared/layout/floating-control';

export function HeaderControls() {
  return (
    <FloatingControl className="flex items-center gap-2">
      <BlogNavLink />
      <ThemeToggle />
      <LanguageSwitcher />
    </FloatingControl>
  );
}
