import gql from 'graphql-tag';

export const starQuery = gql`mutation($clientId: String!, $repoId: ID!) {
  addStar(input: {
    clientMutationId: $clientId,
    starrableId: $repoId}) {
    clientMutationId
  }
}`;
