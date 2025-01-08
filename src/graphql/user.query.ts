import { gql } from "@apollo/client";

export const login_user_query = gql`
  query LoginUser($name: String, $email: String, $password: String) {
    loginUser(name: $name, email: $email, password: $password) {
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
