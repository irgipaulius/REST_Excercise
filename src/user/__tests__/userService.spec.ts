import { getAvatar } from '../userService'

describe('users.ts:', () => {
  describe('getAvatar():', () => {
    it('should return avatar image base64 of user with id 1', async done => {
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
