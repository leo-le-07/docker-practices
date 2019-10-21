import cloudinary from 'cloudinary'
import { gql } from 'apollo-server-express'

export const typeDef = gql`
  type Photo {
    id: ID!
    url: String!
  }

  extend type Mutation {
    singleUpload(file: Upload!): Photo!
    multipleUpload(files: [Upload!]!): [Photo!]!
  }
`

export const resolvers = {
  Mutation: {
    singleUpload: async (parent, { file }, { db }) => {
      const photo = await uploadFileAndPersistDb({ file, db })

      return photo
    },
    multipleUpload: async (parent, { files }, { db }) => {
      const photos = await Promise.all(files.map(file => uploadFileAndPersistDb({ file, db })))
      return photos
    },
  }
}

const uploadFileAndPersistDb = async ({ file, db }) => {
  const url = await upload({ file })

  const photo = await db.Photo.create({
    url,
  })

  return photo
}

export const upload = async ({ file }) => {
  let url
  const { createReadStream } = await file
  const stream = createReadStream()

  const cloudinaryUpload = async (stream) => {
    await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.v2.uploader.upload_stream((error, image) => {
        if (error) {
          return reject(error)
        }
        url = image.url
        return resolve(url)
      })

      stream.pipe(streamLoad)
    })
  }

  await cloudinaryUpload(stream)

  return url
}
