import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const prsQuery = gql`
  query prsQuery($repoName: String!) {
  repository(owner: "gaearon", name: $repoName) {
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
    const { data: { loading, error, todos } } = this.props;
    let prs = null;

    if (loading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>Error!</p>;
    } else {
      prs = data ? data.pullRequests.edges.map(pr => <div key = {pr.node.id}>{pr.node.title}</div>) : null;
    }
    return (
      <div>
        <h2>Pull requests:</h2>
        <Link to="/">Back</Link>
        {prs}
      </div>
    );
  }
}

export default graphql(prsQuery, {options: { variables: { repoName: 'redux-thunk'}}})(PRs);
