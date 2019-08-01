import React from 'react';
// local
import Borders from '../component/borders';
import Content from '../component/content';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Content />
      <Borders />
    </React.Fragment>
  );
};

export default App;
