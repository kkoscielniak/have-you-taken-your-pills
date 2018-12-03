import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker'; // eslint-disable-line import/no-namespace

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
