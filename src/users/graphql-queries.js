import { gql } from "@apollo/client"

export const GET_USERS = gql`
query getUsers {
  users {
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
    nodes {
      id
      name
      email
      gender
      status
    }
  }
}
`
