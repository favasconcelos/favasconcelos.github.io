import React from 'react';
// local
import './info.scss';
import Photos from '../photos';
import Social from '../social';

import Born from '../icon/Born';
import Home from '../icon/Home';

// images
import flagBR from '../../_assets/flag_brazil.svg';
import flagES from '../../_assets/flag_spain.svg';

const Info: React.FC = () => {
  return (
    <div id="info">
      <div>
        <h1>
          Felipe Vasconcelos is a <span className="bold">Software Developer</span>
        </h1>
        <h3>
          <Born />
          <span className="bold">Recife</span>
          <img src={flagBR} className="icon" alt="Brazil" title="Brazil" />
          {' -- '}
          <Home />
          <span className="bold">Zaragoza</span>
          <img src={flagES} className="icon" alt="Spain" title="Spain" />
        </h3>
        <hr id="separator" />
        <Photos />
        <hr id="separator" />
        <Social />
      </div>
      <div id="copyright">COPYRIGHT © 2015 - FELIPE VASCONCELOS</div>
    </div>
  );
};

export default Info;
