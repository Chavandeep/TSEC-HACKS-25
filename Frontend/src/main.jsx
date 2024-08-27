
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Translator } from '@miracleufo/react-g-translator';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Translator from="en" to={document.documentElement.lang || 'en'}>
    <App />
  </Translator>
);