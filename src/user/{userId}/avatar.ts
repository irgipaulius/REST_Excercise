import { Request } from 'express'
import { getAvatar } from '../userService'

export default {
  async GetAvatar(req: Request) {
    if (req && req.params && req.params.userId) {
      try {
        return getAvatar(req.params.userId)
      } catch (error) {
        throw new Error(error)
      }
    } else {
      throw new Error('Invalid user id.')
    }
  },
}
