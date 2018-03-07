import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Repos from '../features/repos/index';
import PRs from '../features/pullRequests/index';
import './App.css';

// insert your github auth token
const accessToken = 'a5e06dc7710ec0c9cdc7b9fafb405937fe86d6b8';

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
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => (
              <Repos togglePRs={this.togglePRs}/>
            )}/>
            <Route path='/pr/:prId' render={() => (
              <PRs
                repoName={this.state.activePR}
                togglePRs={this.togglePRs.bind(this)}
              />
            )}/>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }

  togglePRs = (pr) => {
    return this.setState({
      isPRshowing: !this.state.isPRshowing,
      activePR: pr
    });
  }
}

export default App;
