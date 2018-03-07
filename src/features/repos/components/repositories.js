import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Repositories(props) {
  const reposList = props.repos.map(repo =>
    (<div key = {repo.id}>
      <Link to={`/pr/${repo.name}`}>
        <div onClick={props.showPRs.bind(this, repo.name)}>{repo.name}</div>
      </Link>
      <button onClick={props.addRepoStar.bind(this, repo.clientId, repo.id)}>Star</button>
      <button onClick={props.removeRepoStar.bind(this, repo.clientId, repo.id)}>UnStar</button>
    </div>));

  return <div>{reposList}</div>;
}

Repositories.propTypes = {
  repos: PropTypes.array,
  showPRs: PropTypes.func,
  addRepoStar: PropTypes.func,
  removeRepoStar: PropTypes.func
};

export default Repositories;
