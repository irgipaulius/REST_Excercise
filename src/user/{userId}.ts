import { Request } from 'express'
import { getUserById } from './userService'

/**
 * Operations on /users/{userId}
 */
export default {
  async GetUser(req: Request) {
    if (req && req.params && req.params.userId) {
      try {
        return getUserById(req.params.userId)
      } catch (error) {
        throw new Error(error)
      }
    } else {
      throw new Error('Invalid user id.')
    }
  },
}
