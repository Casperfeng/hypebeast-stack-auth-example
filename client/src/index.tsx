import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ExampleProvider from './context/ExampleContext';
import Routes from './navigation/Routes';

ReactDOM.render(
  <React.StrictMode>
    <ExampleProvider>
      <Routes />
    </ExampleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
