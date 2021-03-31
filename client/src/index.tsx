import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { getAccessToken, setAccessToken } from './accessToken';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache({});

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any;
    Promise.resolve(operation)
      .then(operation => {
        const accessToken = getAccessToken();
        if (accessToken){
          operation.setContext({
            headers: {
              authorization: `bearer ${accessToken}`
            }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }
        try {
          const { exp } = jwtDecode(token) as any;
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch('http://localhost:4000/refresh_token', {
          method: 'POST',
          credentials: "include"
        });
      },
      handleFetch: (accessToken: string) => setAccessToken(accessToken),
      handleError: (err: Error) => console.error(err)
    }) as any,
    requestLink,
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include'
    })
  ]),
  cache,
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        cache.writeData({ data: { isConnected }});
        return null;
      }
    }
  },
});

cache.writeData({
  data: {
    isConnected: true
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client as any}>
      <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
