import shortid from 'shortid'
import fs from 'fs'
import path from 'path'
import cloudinary from 'cloudinary'

const upload = async ({ file }) => {
  let url
  const { createReadStream } = await file
  const stream = createReadStream()

  const cloudinaryUpload = async (stream) => {
    await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.v2.uploader.upload_stream((error, image) => {
        if (error) {
          reject(error)
        }
        url = image.url
        resolve(url)
      })

      stream.pipe(streamLoad)
    })
  }

  await cloudinaryUpload(stream)

  return url
}

const uploadFileAndPersistDb = async ({ file, db }) => {
  const url = await upload({ file })

  const photo = await db.Photo.create({
    url,
    fileName: 'this-field-will-be-deleted',
    description: 'this-field-will-be-deleted',
    mimetype: 'this-field-will-be-deleted',
  })

  return photo
}

export default {
  Query: {
    users: (parent, args, { db }) => db.User.findAll(),
    user: (parent, { id }, { db }) => db.User.findByPk(id),
  },
  Mutation: {
    singleUpload: async (parent, { file }, { db }) => {
      const photo = await uploadFileAndPersistDb({ file, db })

      return photo
    },
    multipleUpload: async (parent, { files }, { db }) => {
      const photos = await Promise.all(files.map(file => uploadFileAndPersistDb({ file, db })))
      return photos
    }
  },
}
