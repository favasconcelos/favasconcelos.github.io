import React from 'react';
// local
import './borders.scss';

const Borders: React.FC = () => {
  return (
    <React.Fragment>
      <div id="top"></div>
      <div id="left"></div>
      <div id="right"></div>
      <div id="bottom"></div>
    </React.Fragment>
  );
};

export default Borders;
