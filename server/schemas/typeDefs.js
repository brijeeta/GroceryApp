const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Product {
        _id: ID
        description: String
        image:String
        category: String
        productId:String
    }

    type User {
    _id: ID
    username: String!
    email: String!
    productCount: Int
    savedProducts: [Product]
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

    type KrogerData {
        productId: Float
        description: String
        category: String
        image: String
    }

    type Query {
        categories: String
        products(_ID: ID, name: String): [Product]
        product(_id: ID!): List
        user: User
        krogerSearch(term: String!): [KrogerData]
    }

    input SavedProductInput {
    description: String
    productId: String
    image: String
    category: String
  }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addList(name: String!, products: [ID]!): List
        updateUser(username: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
        saveProduct(input: SavedProductInput): User
    }
`

module.exports = typeDefs;