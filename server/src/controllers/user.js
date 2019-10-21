import { gql } from 'apollo-server-express'

export const typeDef = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    posts: [Post]!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }
`

export const resolvers = {
  Query: {
    users: (parent, args, { db }) => db.User.findAll(),
    user: (parent, { id }, { db }) => db.User.findByPk(id),
  }
}
