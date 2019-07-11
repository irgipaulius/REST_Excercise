import { Request } from 'express'
import { getAvatar, deleteAvatar } from '../userService'

export default {
  async GetAvatar(req: Request) {
    if (req && req.params && req.params.userId) {
      try {
        return await getAvatar(req.params.userId)
      } catch (error) {
        throw new Error(error)
      }
    } else {
      throw new Error('Invalid user id.')
    }
  },
  async DeleteAvatar(req: Request) {
    if (req && req.params && req.params.userId) {
      try {
        return await deleteAvatar(req.params.userId)
      } catch (error) {
        throw new Error(error)
      }
    } else {
      throw new Error('Invalid user id.')
    }
  },
}
