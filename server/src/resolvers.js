import shortid from 'shortid'
import fs from 'fs'
import path from 'path'

const UPLOAD_DIR = './uploads'

const storeFileLocalAndPersistDb = async ({ file, db }) => {
  const { filename, mimetype, createReadStream } = await file
  const id = shortid.generate()
  const filePath = path.join(__dirname, `${UPLOAD_DIR}/${id}-${filename}`) 
  const stream = createReadStream()

  // Store the file in the filesystem
  await new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) fs.unlinkSync(filePath)
        reject(error)
      })
      .pipe(fs.createWriteStream(filePath))
      .on('error', error => {
        return reject(error)
      })
      .on('finish', () => resolve())
  )

  const photo = await db.Photo.create({
    url: filePath,
    fileName: filename,
    description: 'this-field-will-be-deleted',
    mimetype,
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
      const photo = await storeFileLocalAndPersistDb({ file, db })

      return photo
    },
    multipleUpload: async (parent, { files }, { db }) => {
      const photos = await Promise.all(files.map(file => storeFileLocalAndPersistDb({ file, db })))
      return photos
    }
  },
}
