import gql from 'graphql-tag';

export const reposQuery = gql`query{
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

export const starQuery = gql`mutation($clientId: String!, $repoId: ID!) {
  addStar(input: {
    clientMutationId: $clientId,
    starrableId: $repoId}) {
    clientMutationId
  }
}`;

export const unStarQuery = gql`mutation($clientId: String!, $repoId: ID!) {
  removeStar(input: {
    clientMutationId: $clientId,
    starrableId: $repoId}) {
    clientMutationId
  }
}`;
