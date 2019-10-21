import merge from 'lodash/merge'
import { gql } from 'apollo-server-express'

import { resolvers as userResolvers, typeDef as User } from './user'
import { resolvers as photoResolvers, typeDef as Photo } from './photo'
import { resolvers as postResolvers, typeDef as Post } from './post'

export const resolvers = merge(
  postResolvers,
  photoResolvers,
  userResolvers,
)

const baseTypeDef = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`
export const typeDefs = [
  baseTypeDef,
  Post,
  Photo,
  User,
]
