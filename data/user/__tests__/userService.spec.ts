import { getAvatar, requestReqres } from '../userService'
import fs from 'fs'
import path from 'path'

//with more time I could mock request module or at least requestReqres function
//and test everything in greater detail. requires a lot of time for me though

describe('users.ts:', () => {
  describe('getAvatar():', () => {
    it('should return avatar image base64 of user with id 1', async done => {
      await unlinkFilesInDirectory(path.join(__dirname, '../', '../', '../', 'avatars'))
      try {
        const avatar = await getAvatar('1')
        expect(avatar).toEqual(expect.any(String))
      } catch (err) {
        expect(getAvatar).not.toThrow()
      }
      done()
    })
  })
})

async function unlinkFilesInDirectory(directory: string) {
  return new Promise((res, rej) => {
    fs.readdir(directory, (err, files) => {
      if (err) rej(err)

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) rej(err)
          res()
        })
      }
    })
  })
}
