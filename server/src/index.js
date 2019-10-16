import express from 'express'
import morgan from 'morgan'
import { Client } from 'pg'

const app = express()
const PORT = process.env.API_PORT

const client = new Client({
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  host: 'xiusin-db',
  port: process.env.POSTGRES_PORT,
})

app.use(morgan('combined'))

app.get('/', (req, res)  => {
  res.send('Hello from Express.js app!')
})

app.get('/ping', async (req, res) => {
  const database = await client.query('SELECT 1 + 1').then(() => 'up').catch(() => 'down')

  res.send({
    environment: process.env.NODE_ENV,
    database,
  })
})

;(async () => {
  await client.connect()
  app.listen(PORT, () => console.log(`app running on ${PORT}`));
})()

