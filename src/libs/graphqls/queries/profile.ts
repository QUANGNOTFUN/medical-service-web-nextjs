import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($input: GetUserByIdInput!) {
    getUserById(input: $input) {
      id
      full_name
      email
      phone
      address
      date_of_birth
      avatar
    }
  }
`;
