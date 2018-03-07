import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prsQuery } from './queries/pullRequests';

import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

const config = {
  options: ({ repoName }) => {
    return {
      variables: {
        repoName,
        owner: 'DmitriyPavlovskyi'
      }
    };
  }
};

class PRs extends Component {
  static propTypes = {

  };

  render() {
    const { data: { loading, error } } = this.props;
    const data = this.props.data.repository;
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
        {prs.length > 0 ? prs : <h5>There is no open pull requests</h5>}
      </div>
    );
  }
}

export default graphql(prsQuery, config)(PRs);
