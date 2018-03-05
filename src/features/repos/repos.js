import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {commitMutation, createFragmentContainer, graphql} from 'react-relay';
import { Link } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const login = "DmitriyPavlovskyi";

const reposQuery = gql`query{
    user(login: "DmitriyPavlovskyi"){
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
// https://github.com/github/github-graphql-relay-example/blob/master/src/RepositoryStar.js
const starQuery = gql`mutation($clientId: String!, $repoId: ID!) {
  addStar(input: {
    clientMutationId: $clientId,
    starrableId: $repoId}) {
    clientMutationId
  }
}`;

class Repos extends Component {
  static propTypes = {

  };

  render() {
    const { data: { loading, error, todos } } = this.props;
    let data = this.props.data.user;
    let repoLIst = null;

    if (loading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>Error!</p>;
    } else {
     repoLIst = data ? data.repositories.nodes.map(repo =>
      <div>
        <Link to={`/pr/${repo.name}`} key = {repo.id}>
          <div onClick={this.showPRs.bind(this, repo.name)}>{repo.name}</div>
        </Link>
        <button onClick={this.star.bind(this, repo.clientId, repo.id)}>Star</button>
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

  toggleStar() {
    console.log('---Star toggled');}
  star(clientId, repoId) {
    debugger;
    this.props.addStar({variables: { clientId: login, repoId}});
  }
}
export default compose(
  graphql(reposQuery),
  graphql(starQuery, { name: 'addStar'}),
  // graphql(starMutation, { name: 'starMutation' }),
)(Repos)
