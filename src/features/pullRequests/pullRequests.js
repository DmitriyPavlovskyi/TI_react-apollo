import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const test = 'redux-thunk';

const prsQuery = gql`query{
  repository(owner: "gaearon", name: "${test}") {
    pullRequests(first: 100, states: OPEN) {
      edges {
        node {
          title
          headRefName
          commits (first:100) {
            totalCount
            edges {
              node {
                commit {
                  message
                }
                id
              }
            }
          }
        }
      }
    }
  }
}`;

class PRs extends Component {
  static propTypes = {

  };

  render() {
    const data = this.props.data.repository;
    debugger
    const prs = data ? data.pullRequests.edges.map(pr => <div key = {pr.node.id}>{pr.node.title}</div>) : null;
    return (
      <div>
        {prs}
      </div>
    );
  }
}

export default graphql(prsQuery)(PRs);
