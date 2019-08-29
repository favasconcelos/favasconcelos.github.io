import React from 'react';
// local
import Email from './Email';
import Github from './Github';
import Skype from './Skype';
import Twitter from './Twitter';
import Resume from './Resume';
import LinkedIn from './LinkedIn';

export enum IconType {
  RESUME = 'Resume',
  GITHUB = 'Github',
  LINKEDIN = 'LinkedIn',
  SKYPE = 'Skype',
  TWITTER = 'Twitter',
  EMAIL = 'E-mail',
}

type OwnProps = {
  className?: string;
  type: IconType;
};

export default function Icon(props: OwnProps) {
  switch (props.type) {
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
