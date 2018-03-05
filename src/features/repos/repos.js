import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const viewerQuery = gql`query{
    user(login: "gaearon"){
        repositories(first: 50){
            nodes{
                name
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
      <div key = {repo.name} onClick={this.showPRs}>{repo.name}
        <button>Star</button>
      </div>) : null;
    return (
      <div>
        <h2>Repositories:</h2>
        {test}
      </div>
    );
  }

  showPRs() {
    console.log('---PRs requested');
  }
}

export default graphql(viewerQuery)(Repos);
