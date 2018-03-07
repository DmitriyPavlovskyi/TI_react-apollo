import gql from 'graphql-tag';

export const unStarQuery = gql`mutation($clientId: String!, $repoId: ID!) {
  removeStar(input: {
    clientMutationId: $clientId,
    starrableId: $repoId}) {
    clientMutationId
  }
}`;
