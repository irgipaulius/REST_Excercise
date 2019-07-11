import express, { Express, Request, Response } from 'express'
import path from 'path'
import http, { Server } from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { initialize } from 'express-openapi'
import swaggerUi from 'swagger-ui-express'

export class RestServer {
  app: Express
  server: Server
  swaggerConfig: JSON
  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)

    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    this.swaggerConfig = require('../config/swagger.json')

    this.initSwag()

    this.app.use((err: Error, req: Request, res: Response, next: Function) => {
      res.status(500).send(JSON.stringify(err, Object.getOwnPropertyNames(err)))
    })

    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerConfig))
  }

  listen(port = 3000) {
    this.server.listen(port, function() {
      console.log('rest-server listening at port :' + port)
    })
  }

  private initSwag() {
    initialize({
      app: this.app,
      //@ts-ignore
      apiDoc: this.swaggerConfig,
      errorMiddleware: (err, req, res, next) => {
        console.log(JSON.stringify(err.errors, undefined, ' '))
        res.status(err.status).send(err.errors)
      },
      paths: path.resolve(__dirname, './handlers'),
    })
  }
}
