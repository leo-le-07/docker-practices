import { gql } from 'apollo-server-express'

import { upload } from './photo'

export const typeDef = gql`
  type Post {
    id: ID!
    content: String!
    photos: [Photo]!
  }

  extend type Query {
    posts(userId: ID!): [Post!]!
  }

  extend type Mutation {
    createPost(userId: ID!, content: String!, url: String!): Post!
  }
`
export const resolvers = {
  Query: {
    posts: async (parent, { userId }, { db }) => {
      return db.Post.findAll({ where: { userId } })
    },
  },
  Mutation: {
    createPost: async (parent, { url, content, userId }, { db }) => {
      const newPost = await db.Post.create({
        userId,
        content,
      })
      const photo = await db.Photo.create({
        sourceId: newPost.id,
        url,
      })
      return newPost
    },
  },
  Post: {
    photos: (post, {}, { db }) => {
      return db.Photo.findAll({ where: { sourceId: post.id } })
    },
  },
}
