import { FloatingControl } from '@/components/floating-control';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export function HeaderControls() {
  return (
    <FloatingControl className="flex items-center gap-2">
      <ThemeToggle />
      <LanguageSwitcher />
    </FloatingControl>
  );
}
