
import gql from "graphql-tag";

export const GET_ME = gql`
    {
        me {
            _id
            email
            username
            lists {
                products {
                    name
                    description
                    image
                    price
                    quantity
                }
            }
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
