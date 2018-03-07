import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import Repositories from './components/repositories';

// import test from './queries/repositories.graphql';

// queries
import { reposQuery } from './queries/repositories';
import { starQuery } from './queries/star';
import { unStarQuery } from './queries/unStar';

// console.log(test);

const login = 'DmitriyPavlovskyi';

class Repos extends Component {
  static propTypes = {
  };

  render() {
    const { data: { loading, error } } = this.props;
    let data = this.props.data.user;
    let repoLIst = null;

    if (loading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>Error!</p>;
    } else {
      repoLIst = data ? <Repositories
      repos = {data.repositories.nodes}
      showPRs = {this.showPRs.bind(this)}
      addRepoStar = {this.addRepoStar.bind(this)}
      removeRepoStar = {this.removeRepoStar.bind(this)}
      /> : null;
    }
    return (
      <div>
        <h2>Repositories:</h2>
        {repoLIst}
      </div>
    );
  }

  showPRs = (prs) => {
    this.props.togglePRs(prs);
    console.log('---PRs requested');
  }

  addRepoStar(clientId, repoId) {
    this.props.addStar({variables: { clientId: login, repoId}});
    console.log('---Repository starred');
  }
  removeRepoStar(clientId, repoId) {
    this.props.removeStar({variables: { clientId: login, repoId}});
    console.log('---Repository unstarred');
  }
}

export default compose(
  graphql(reposQuery),
  graphql(starQuery, { name: 'addStar'}),
  graphql(unStarQuery, { name: 'removeStar'})
)(Repos);
