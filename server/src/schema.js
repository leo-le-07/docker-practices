export default `
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
  }

  type Photo {
    id: String!
    url: String!
    description: String!
    mimetype: String!
    fileName: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    singleUpload(file: Upload!, description: String): Photo!
  }
`
