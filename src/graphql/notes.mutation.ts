import { gql } from "@apollo/client";

export const add_note_mutation = gql`
  mutation AddNote($notes: [NoteInput!]!) {
    AddNote(notes: $notes) {
      message
      success
    }
  }
`;

export const delete_note_mutation = gql`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId) {
      message
      success
    }
  }
`;

export const update_note_mutation = gql`
  mutation SwitchIsImportant($noteId: String!) {
    switchIsImportant(noteId: $noteId) {
      message
      success
    }
  }
`;
