import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4567/graphql',
  });

ReactDOM.render(<ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloHooksProvider>
  </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
