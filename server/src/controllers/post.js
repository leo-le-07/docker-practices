import { gql } from 'apollo-server-express'

import { upload } from './photo'

export const typeDef = gql`
  type Post {
    id: ID!
    content: String!
    photos: [Photo]!
  }

  extend type Mutation {
    createPost(userId: ID!, content: String!, file: Upload!): Post!
  }
`
export const resolvers = {
  Mutation: {
    createPost: async (parent, { file, content, userId }, { db }) => {
      console.log({ file, content, userId })
      const url = await upload({ file })
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
