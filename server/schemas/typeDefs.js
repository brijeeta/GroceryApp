const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Product {
        _id: ID
        name: String
        description: String
        image:String
        quantity: Int
        price: Float
        category: String
    }

    type User {
        _id: ID
        username: String
        email: String
        lists: [List]
    }

    type List {
        _id: ID
        name: String
        products: [Product]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: String
        products(_ID: ID, name: String): [Product]
        product(_id: ID!): List
        user: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addList(name: String!, products: [ID]!): List
        updateUser(username: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;