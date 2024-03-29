import React from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { App } from 'App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import './i18n/i18n.ts';

// axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND ?? 'https://dureo552e4.execute-api.eu-west-1.amazonaws.com/dev/';

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
