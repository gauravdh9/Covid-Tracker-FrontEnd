import { gql } from "@apollo/client";
export const REGISTER_USER = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    register(userData: { name: $name, email: $email, password: $password }) {
      message
    }
  }
`;
export const LOGIN_USER = gql`
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_DATA = gql`
  query ($start: String!, $end: String!) {
    getData(start: $start, end: $end) {
      date
      cases {
        Hospitalized
        Recovered
        Deceased
        Active
      }
      prev {
        Hospitalized
        Recovered
        Deceased
        Active
      }
    }
  }
`;

export const GET_TOTAL_DATA = gql`
  query {
    getTotalData {
      total {
        Active
        Recovered
        Deceased
      }
      message
    }
  }
`;
