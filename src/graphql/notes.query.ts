import { gql } from "@apollo/client";

export const get_all_notes = gql`
  query GetAllNotes($getImportant: Boolean) {
    getAllNotes(getImportant: $getImportant) {
      message
      success
      data {
        id
        title
        description
        isImportant
        userId
        createdAt
        updatedAt
      }
    }
  }
`;
