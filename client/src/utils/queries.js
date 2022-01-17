
import gql from "graphql-tag";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
`;

export const KROGER_SEARCH = gql`
    query krogerSearch($term: String!) {
        krogerSearch(term: $term) {
                productId
                description
                category
                image
        }
    }
`
