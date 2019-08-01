import React from 'react';
// local
import './content.scss';
import Profile from '../profile';
import Photos from '../photos';
// images
import flagBR from '../../_assets/flag_brazil.svg';
import flagES from '../../_assets/flag_spain.svg';

const Content: React.FC = () => {
  return (
    <div id="content">
      <div id="info">
        <h1>
          Felipe Vasconcelos is a <span className="bold">Software Developer</span>
        </h1>
        <h3>
          from <span className="bold">Recife</span>
          <img src={flagBR} className="flag" alt="Brazil" title="Brazil" />
          now <span className="bold">Zaragoza</span>
          <img src={flagES} className="flag" alt="Spain" title="Spain" />
        </h3>
        <hr id="separator" />
        <Photos />

        <div id="copyright">COPYRIGHT © 2015 - FELIPE VASCONCELOS</div>
      </div>
      <Profile />
    </div>
  );
};

export default Content;
