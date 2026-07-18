import type { JSX } from 'react';

import { Email } from './icons/email';
import { Github } from './icons/github';
import { LinkedIn } from './icons/linked-in';
import { Resume } from './icons/resume';
import { Skype } from './icons/skype';
import { Twitter } from './icons/twitter';

export enum IconType {
  RESUME = 'Resume',
  GITHUB = 'Github',
  LINKEDIN = 'LinkedIn',
  SKYPE = 'Skype',
  TWITTER = 'Twitter',
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
    case IconType.SKYPE:
      return <Skype />;
    case IconType.TWITTER:
      return <Twitter />;
    case IconType.RESUME:
      return <Resume />;
    case IconType.LINKEDIN:
      return <LinkedIn />;
    default:
      return null;
  }
}
