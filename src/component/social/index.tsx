import React from 'react';
// local
import './social.scss';
import Icon, { IconType } from '../icon';

const LINKS = [
  {
    href: 'https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit',
    type: IconType.RESUME,
  },
  {
    href: 'https://www.linkedin.com/in/felipevasconcelos',
    type: IconType.LINKEDIN,
  },
  {
    href: 'https://github.com/favasconcelos',
    type: IconType.GITHUB,
  },
  {
    href: 'skype:vasconcelos90.felipe?call',
    type: IconType.SKYPE,
  },
  {
    href: 'https://twitter.com/favasconcelos',
    type: IconType.TWITTER,
  },
  {
    href: 'mailto:f@avasconcelos.com',
    type: IconType.EMAIL,
  },
];

const Social: React.FC = () => {
  return (
    <div id="social">
      {LINKS.map((link, i) => {
        const key = `link-${i}`;
        return (
          <a key={key} href={link.href} title={link.type} target="_blank" rel="noopener noreferrer">
            <Icon type={link.type} className="icon" />
          </a>
        );
      })}
    </div>
  );
};

export default Social;
