import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser($name: String!, $gender: String!, $email: String!, $status: String!) {
  createUser (
    input: {
      name: $name
      gender: $gender
      email: $email
      status: $status
    }
  ) {
    user{
      id
      name
      gender
      email
      status
    }
  }
}
`
