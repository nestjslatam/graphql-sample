import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app';
import { addAxiosRequestInterceptor } from './utils/auth';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// TODO: Refactor this adding auth credentials, get token and persist it in localStorage
const auth = {
  isAuthenticated: true,
  token: 'xxxxxxxxxx',
  rol: 'admin'
};

const Authenticate = (credentials) => {
  return auth;
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

const buildApp = () => {
  const context = Authenticate({ user: 'admin', password: 'admin' });

  const { isAuthenticated } = context;

  if (isAuthenticated) {
    addAxiosRequestInterceptor(context);

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </React.StrictMode>
    );
  }
};

buildApp();
