import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reposQuery, starQuery, unStarQuery } from './gqlConfig';
import { graphql, compose } from 'react-apollo';

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
      repoLIst = data ? data.repositories.nodes.map(repo =>
        <div key = {repo.id}>
          <Link to={`/pr/${repo.name}`}>
            <div onClick={this.showPRs.bind(this, repo.name)}>{repo.name}</div>
          </Link>
          <button onClick={this.addRepoStar.bind(this, repo.clientId, repo.id)}>Star</button>
          <button onClick={this.removeRepoStar.bind(this, repo.clientId, repo.id)}>UnStar</button>
        </div>) : null;
    }
    return (
      <div>
        <h2>Repositories:</h2>
        {repoLIst}
      </div>
    );
  }

  showPRs(prs) {
    this.props.togglePRs(prs);
    console.log('---PRs requested');
  }

  addRepoStar(clientId, repoId) {
    this.props.addStar({variables: { clientId: login, repoId}});
  }
  removeRepoStar(clientId, repoId) {
    this.props.removeStar({variables: { clientId: login, repoId}});
  }
}
export default compose(
  graphql(reposQuery),
  graphql(starQuery, { name: 'addStar'}),
  graphql(unStarQuery, { name: 'removeStar'})
)(Repos);
