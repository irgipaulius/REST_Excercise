import express, { Express, Request, Response } from 'express'
import path from 'path'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { initialize } from 'express-openapi'
import swaggerUi from 'swagger-ui-express'

export function startServer(port = 3000) {
  require('dotenv').config()

  const app = express()
  const server = http.createServer(app)

  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))

  const swaggerConfig = require('../config/swagger.json')

  initialize({
    app,
    apiDoc: swaggerConfig,
    errorMiddleware: (err, req, res, next) => {
      console.log(JSON.stringify(err.errors, undefined, ' '))
      res.status(err.status).send(err.errors)
    },
    paths: path.resolve(__dirname, './handlers'),
  })

  app.use((err: Error, req: Request, res: Response, next: Function) => {
    res.status(500).send(JSON.stringify(err, Object.getOwnPropertyNames(err)))
  })

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

  server.listen(port, function() {
    console.log('rest-server listening at port :' + port)
  })

  return app
}
