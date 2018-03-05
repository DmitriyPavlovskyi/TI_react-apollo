import React, { Component } from 'react';
import Repos from '../features/repos/repos';
import './App.css';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const accessToken = '5bd872fbe6917a8891a057889f6c9f3a2726342f';// insert your github auth token

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.github.com/graphql', headers: { authorization: `bearer ${accessToken}` } }),
  cache: new InMemoryCache()
});

class App extends Component {
  static propTypes = {

  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Repos />
          <button onClick={this.viewQuery}>view</button>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
