import gql from 'graphql-tag';

export const prsQuery = gql`
  query prsQuery($repoName: String!, $owner: String!) {
  repository(owner: $owner, name: $repoName) {
    pullRequests(first: 100) {
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

export const config = {
  options: ({ repoName }) => {
  return {
    variables: {
      repoName,
      owner: 'DmitriyPavlovskyi'
    }
  }}
};
