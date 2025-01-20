import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query getRepositories {
    repositories {
      edges {
        node {
          id
          fullName
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
