import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {commitMutation, createFragmentContainer, graphql} from 'react-relay';
import { Link } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const reposQuery = gql`
  query {
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

const starMutation = gql`
  mutation {
    addStar(input: {starrableId: "MDEwOlJlcG9zaXRvcnk1Mzg1MzI0Mg=="}) {
      starrable {
        id
        __typename
      }
    }
}`;
// https://github.com/github/github-graphql-relay-example/blob/master/src/RepositoryStar.js
class Repos extends Component {
  static propTypes = {

  };

  render() {
    debugger
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
        <button onCLick={this.toggleStar.bind(null, repo.id)}>Star</button>
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

  toggleStar() {debuger
    // this.starMutation(repository.id);
    console.log('---Star toggled');
    // this.commitMutation()
  }
}
// export default compose(
//   graphql(reposQuery, { name: 'reposQuery' }),
//   graphql(starMutation, { name: 'starMutation' }),
// )(Repos)

export default graphql(reposQuery)(Repos);
