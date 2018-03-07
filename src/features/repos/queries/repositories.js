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
