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

export const UPDATE_USER = gql`
mutation updateUser($id: Int!, $name: String!, $gender: String!, $email: String!, $status: String!) {
  updateUser (
    input: {
      id: $id
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

export const DELETE_USER = gql`
mutation deleteUser($id: Int!) {
  deleteUser (
    input: {
      id: $id
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
