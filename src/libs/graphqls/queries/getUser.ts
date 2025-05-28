import { gql } from "@apollo/client";

export const GET_USER = gql`
query GetAllUser(@id: Float!){
  getAllUsers(pagination: {page: 1, limit: 10}) {
    data {
      id
      email
      role
      full_name
    }
    total
    currentPage
    itemsPerPage
  }
}`;
