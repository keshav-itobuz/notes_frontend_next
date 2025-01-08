import { gql } from "@apollo/client";

export const register_user_mutation = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      message
      success
      data {
        token
        user {
          id
          name
          imageUrl
        }
      }
    }
  }
`;

export const upload_profile_image_mutation = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      message
      success
      data
    }
  }
`;

export const uploadProfileImage = `
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      message
      success
      data
    }
  }
`;
