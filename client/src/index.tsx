import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-boost";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './navigation/Routes';
import * as serviceWorker from './serviceWorker';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client as any}>
      <Routes />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
