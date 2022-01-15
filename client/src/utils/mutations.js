import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const SAVE_PRODUCT = gql`
  mutation saveProduct($product: SavedProductInput!) {
    saveProduct(product: $product) {
      username
      email
      lists {
        products {
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation removeProduct($productId: String!) {
    removeProduct(productId: $productId) {
      username
      email
      lists {
        products {
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;