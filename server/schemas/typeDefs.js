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
        image:String
        quantity: Int
        price: Float
        category: Category
    }

    type User {
        _id: ID
        username: String
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

    type KrogerData {
        productId: Int
        description: String
        price: Float
        category: String
    }

    type Query {
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): List
        user: User
        krogerSearch(term: String!): [KrogerData]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addList(products: [ID]!): List
        updateUser(username: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;