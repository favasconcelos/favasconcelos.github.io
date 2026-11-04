import type { JSX } from 'react';

import { Email } from './icons/email';
import { Github } from './icons/github';
import { LinkedIn } from './icons/linked-in';
import { Resume } from './icons/resume';

export enum IconType {
  RESUME = 'Resume',
  GITHUB = 'Github',
  LINKEDIN = 'LinkedIn',
  EMAIL = 'E-mail',
}

type IconProps = {
  type: IconType;
};

export function Icon({ type }: IconProps): JSX.Element | null {
  switch (type) {
    case IconType.EMAIL:
      return <Email />;
    case IconType.GITHUB:
      return <Github />;
    case IconType.RESUME:
      return <Resume />;
    case IconType.LINKEDIN:
      return <LinkedIn />;
    default:
      return null;
  }
}
