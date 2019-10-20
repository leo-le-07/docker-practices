export default `
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`
