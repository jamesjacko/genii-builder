import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-pt-sans-narrow';
import 'roboto-fontface';
import './index.css';
import './colors.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
