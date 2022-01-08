const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Product {
        _id: ID
        name: String
        description: String
        quantity: Int
        price: Float
        category: Category
    }

    type User {
        _id: ID
        userName: String
        email: String
        lists: [List]
    }

    type List {
        _id: ID
        products: [Product]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): List
    }

    type Mutation {
        addUser(userName: String!, email: String!, password: String!): Auth
        addList(products: [ID]!): List
        updateUser(userName: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(userName: String!, password: String!): Auth
    }
`

module.exports = typeDefs;