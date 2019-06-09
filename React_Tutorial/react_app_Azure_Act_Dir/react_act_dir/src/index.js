import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { runWithAdal } from 'react-adal';
import { authContext } from './adalconfig';

import * as serviceWorker from './serviceWorker';

const DO_NOT_LOGIN = false;
runWithAdal(authContext, () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
    serviceWorker.register();
    // registerServiceWorker();
  },DO_NOT_LOGIN);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
