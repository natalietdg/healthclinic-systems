import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import './fonts/Bogue\ Regular.ttf';
import "./fonts/gill-sans-mt.ttf";
import "./fonts/Gill\ Sans\ MT\ Bold.ttf";
import "./fonts/Gill\ Sans\ MT\ Bold\ Condensed.ttf";
import "./fonts/Gill\ Sans\ MT\ Bold\ Extra\ Condensed.ttf";
import "./fonts/Gill\ Sans\ MT\ Bold\ Italic.ttf";
import "./fonts/Gill\ Sans\ MT\ Book.ttf";
import "./fonts/Gill\ Sans\ MT\ Book\ Italic.ttf";
import "./fonts/Gill\ Sans\ MT\ Condensed.ttf";
import "./fonts/Gill\ Sans\ MT\ Extra\ Bold.ttf";
import "./fonts/Gill\ Sans\ MT\ Heavy.ttf";
import "./fonts/Gill\ Sans\ MT\ Heavy\ Italic.ttf";
import "./fonts/Gill\ Sans\ MT\ Light.ttf";
import "./fonts/Gill\ Sans\ MT\ Light\ Italic.ttf";
import "./fonts/Gill\ Sans\ MT\ Medium.ttf";
import "./fonts/Gill\ Sans\ MT\ Medium\ Italic.ttf";
import "./fonts/Gill\ Sans\ MT\ Ultra\ Bold.ttf";
import "./fonts/Gill\ Sans\ MT\ Ultra\ Bold\ Condensed.ttf"; 

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
