import shortid from 'shortid'
import fs from 'fs'
import path from 'path'

const UPLOAD_DIR = './uploads'

export default {
  Query: {
    users: (parent, args, { db }, info) => db.User.findAll(),
    user: (parent, { id }, { db }, info) => db.User.findByPk(id),
  },
  Mutation: {
    singleUpload: async (parent, { file, description }, { db }, info) => {
      const { filename, mimetype, createReadStream } = await file
      const stream = createReadStream()
      const id = shortid.generate()
      const filePath = path.join(__dirname, `${UPLOAD_DIR}/${id}-${filename}`) 

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
        mimetype,
        description,
      })

      return photo
    },
  },
}
