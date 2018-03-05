import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const prsQuery = gql`query{
  repository(owner: "gaearon", name: "test") {
    pullRequests(first: 100, states: OPEN) {
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
