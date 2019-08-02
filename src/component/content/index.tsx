import React from 'react';
// local
import './content.scss';
import Profile from '../profile';
import Info from '../info';

const Content: React.FC = () => {
  return (
    <div id="content">
      <Info />
      <Profile />
    </div>
  );
};

export default Content;
