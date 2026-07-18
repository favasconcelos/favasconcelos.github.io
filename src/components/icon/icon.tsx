import type { JSX } from 'react';

import Email from './email';
import Github from './github';
import LinkedIn from './linked-in';
import Resume from './resume';
import Skype from './skype';
import Twitter from './twitter';

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

export default function Icon({ type }: IconProps): JSX.Element | null {
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
