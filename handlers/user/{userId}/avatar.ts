import { Operation } from 'express-openapi'
import avatarService from '../../../data/user/{userId}/avatar'

//

export default function() {
  const GET: Operation = async (req, res, next) => {
    try {
      const data = await avatarService.GetAvatar(req)

      res.status(200).json(data)
    } catch (error) {
      res.status(error.code || 500).send(error.message)
    }
  }
  const DELETE: Operation = async (req, res, next) => {
    try {
      res.status(200).json(await avatarService.DeleteAvatar(req))
    } catch (error) {
      res.status(error.code || 500).send(error.message)
    }
  }

  return {
    GET,
    DELETE,
  }
}
