import { Operation } from 'express-openapi'
import userService from '../../src/user/{userId}'

//

export default function() {
  const GET: Operation = async (req, res, next) => {
    try {
      const data = await userService.GetUser(req)

      res.status(200).json(data)
    } catch (error) {
      res.status(error.code || 500).send(error.message)
    }
  }

  return {
    GET,
  }
}
