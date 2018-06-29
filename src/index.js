import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/normalize.css';
import './css/main.css';
import './include/bootstrap';
import App from './App';
import { registerWorker } from './registerWorker';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerWorker();
//registerServiceWorker();
