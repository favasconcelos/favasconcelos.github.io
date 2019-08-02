import React from 'react'
// local
import './social.scss';
// images
import icCurriculum from '../../_assets/ic_resume.svg';
import icLinkedin from '../../_assets/ic_linkedin.svg';
import icGithub from '../../_assets/ic_github.svg';
import icSkype from '../../_assets/ic_skype.svg';
import icTwitter from '../../_assets/ic_twitter.svg';
import icEmail from '../../_assets/ic_email.svg';
import Mail from '../icons/Mail';

const LINKS = [{
  img: icCurriculum,
  href: 'https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit',
  text: 'Resume'
},
{
  img: icLinkedin,
  href: 'https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit',
  text: 'LinkedIn'
},
{
  img: icGithub,
  href: 'https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit',
  text: 'Github'
},
{
  img: icSkype,
  href: 'https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit',
  text: 'Skype'
},
{
  img: icTwitter,
  href: 'https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit',
  text: 'Twitter'
}, {
  img: icEmail,
  href: 'https://docs.google.com/document/d/1aFEFAoAMlutgEA2BJHqXNr8_M7Mk-ZaiJVgdwPGOneM/edit',
  text: 'E-mail'
}];

const Social: React.FC = () => {
  return <div id="social">
    {LINKS.map((link, i) => {
      const key = `link-${i}`;
      return <a key={key} href={link.href} target="_blank" rel="noopener noreferrer">
        <Mail className="icon" />
      </a>
    })}
  </div>
}

export default Social;