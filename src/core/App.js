import React, { Component } from 'react';
import Repos from '../features/repos/repos';
import PRs from '../features/pullRequests/pullRequests';
import './App.css';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const accessToken = '001fd391f936c4261e2fa9a83dc155037f3d8cfc';// insert your github auth token

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.github.com/graphql', headers: { authorization: `bearer ${accessToken}` } }),
  cache: new InMemoryCache()
});

class App extends Component {
  state = {
    isPRshowing: false,
    activePR: ''
  }

  static propTypes = {

  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Repos togglePRs={this.togglePRs}/>
          {this.state.isPRshowing ? <PRs activePR={this.state.activePR}/> : null}
        </div>
      </ApolloProvider>
    );
  }

  togglePRs = () => {
    return this.setState({
      isPRshowing: !this.state.isPRshowing
    });
  }
}

export default App;
