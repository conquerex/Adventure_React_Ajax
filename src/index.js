import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// Import semantics-ui-css first, and index them.
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import './Animation.css';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
