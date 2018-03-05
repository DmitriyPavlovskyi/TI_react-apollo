import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

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
      <Link to={`/pr/${repo.name}`} key = {repo.id}><div onClick={this.showPRs.bind(this, repo.name)}>{repo.name}
        <button>Star</button>
      </div></Link>) : null;
    return (
      <div>
        <h2>Repositories:</h2>
        {test}
      </div>
    );
  }

  showPRs(prs) {
    this.props.togglePRs(prs);
    console.log('---PRs requested');
  }
}

export default graphql(reposQuery)(Repos);
