import React from 'react';
// local
import './info.scss';
import Photos from '../photos';
import Social from '../social';

// images
import icBorn from '../../_assets/ic_born.svg';
import icHome from '../../_assets/ic_home.svg';
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
          <img src={icBorn} className="icon" alt="Born in" title="Born in" />
          <span className="bold">Recife</span>
          <img src={flagBR} className="icon" alt="Brazil" title="Brazil" />
          {' -- '}
          <img src={icHome} className="icon" alt="Living in" title="Living in" />
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
