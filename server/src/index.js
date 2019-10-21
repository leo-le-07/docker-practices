import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { ApolloServer, gql } from 'apollo-server-express'
import cors from 'cors'

import { typeDefs, resolvers } from './controllers'
import db from './models'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
})

const allowedOrigins = [
  `http://localhost:${process.env.WEB_URI}`,
]

const app = express()
apolloServer.applyMiddleware({ app })

app.use(morgan('combined'))
app.use(cors({
  origin(origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(!allowedOrigins.includes(origin)){
      const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}))
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

