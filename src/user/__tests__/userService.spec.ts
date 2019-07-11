import { getAvatar } from '../userService'

//https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg
describe('users.ts:', () => {
  describe('getUserById():', () => {
    it('', async done => {
      done()
    })
  })
  describe('getAvatar():', () => {
    it('should return avatar url', async done => {
      const avatar = await getAvatar('1')
      expect(avatar).toEqual(
        'aHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL3VpZmFjZXMvZmFjZXMvdHdpdHRlci9jYWxlYm9nZGVuLzEyOC5qcGc=',
      )
      done()
    })
  })
})
