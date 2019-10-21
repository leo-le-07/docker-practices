export default `
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    posts: [Post]!
  }

  type Post {
    id: ID!
    content: String!
    photos: [Photo]!
  }

  type Photo {
    id: ID!
    url: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    singleUpload(file: Upload!): Photo!
    multipleUpload(files: [Upload!]!): [Photo!]!
    createPost(userId: ID!, content: String!, file: Upload!): Post!
  }
`
