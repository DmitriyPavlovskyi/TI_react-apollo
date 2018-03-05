import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const reposQuery = gql`query{
    user(login: "gaearon"){
        repositories(first: 50){
            nodes{
                name
                id
            }
            pageInfo{
                hasNextPage
            }
        }
      }
}`;

class Repos extends Component {
  static propTypes = {

  };

  render() {
    let data = this.props.data.user;
    let test = data ? data.repositories.nodes.map(repo =>
      <div key = {repo.id} onClick={this.showPRs.bind(this, repo.name)}>{repo.name}
        <button>Star</button>
      </div>) : null;
    return (
      <div>
        <h2>Repositories:</h2>
        {test}
      </div>
    );
  }

  showPRs(ev) {
    this.props.togglePRs(ev);
    console.log('---PRs requested');
  }
}

export default graphql(reposQuery)(Repos);
