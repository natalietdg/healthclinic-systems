import logo from './logo.svg';
import './App.css';
import { RecoilRoot } from 'recoil';
import React, { useEffect } from 'react';
import { routes } from './routes';
import Shell from './shell';
import './i18n';

const App = () => {
 
  return (
      <RecoilRoot>
        <Shell routes={routes} />
      </RecoilRoot>
    
  );
}

export default App;
