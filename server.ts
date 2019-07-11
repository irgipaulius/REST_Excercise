import express, { Express } from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { initialize } from 'express-openapi'

export function startExpressServer(port = 3000): Express {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.listen(port, () => console.log(`EXPRESS LISTENING ON PORT :${port}...`))

  return app
}

export function startServer(port = 3000) {
  const app: Express = startExpressServer(port)

  const swaggerConfig = require('./config/swagger.json')

  initialize({
    app,
    apiDoc: swaggerConfig,
    errorMiddleware: (err, req, res, next) => {
      console.log(JSON.stringify(err.errors, undefined, ' '))
      res.status(err.status).send(err.errors)
    },
    paths: path.resolve('./handlers'),
  })
}
