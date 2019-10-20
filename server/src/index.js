import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res)  => {
  res.send('Hello from xiusin api!')
})
app.get('/health', (req, res) => res.sendStatus(200))

let server
module.exports = {
  start(port) {
    server = app.listen(port, () => {
      console.log(`Api started on port ${port}`)
    })
    return app
  },
  stop() {
    server.close()
  },
}

