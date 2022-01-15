import gql from 'graphql-tag';

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

export const GET_ALL_PRODUCTS = gql`
    {
        product {
            _id
            name
            description
            image
            price
            quantity
        }
    }
`;