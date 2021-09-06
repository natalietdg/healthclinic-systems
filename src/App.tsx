import logo from './logo.svg';
import './App.css';
import { RecoilRoot } from 'recoil';
import HomePage from 'Pages/home-page';
import React from 'react';
import './i18n';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <HomePage />
      </div>
    </RecoilRoot>
  );
}

export default App;
