jest.mock('fs')

import fs from 'fs'

import { lib, getPagesInfo, savePage } from '../cronService'
import { Page, User } from '../../types'

function getPromiseFunctionMock(result: any) {
  return jest.fn().mockReturnValue(new Promise(res => res(result)))
}
function getPromiseRejectFunctionMock(errorMessage: any) {
  return jest.fn().mockReturnValue(new Promise((res, rej) => rej(errorMessage)))
}
function mockFunction(fn: any, result: any) {
  fn.mockImplementation(() => result)
}

describe('cron:', () => {
  describe('cronService:', () => {
    describe('savePage():', () => {
      it('should try to write to file data, which is received from the request', async done => {
        lib.requestReqres = getPromiseRejectFunctionMock('some error')

        try {
          await savePage(6)
          expect(savePage).toThrow()
        } catch (e) {
          expect(e).toEqual(new Error('some error'))
          expect(lib.requestReqres).toBeCalledWith('https://reqres.in/api/users?page=6')

          expect(fs.existsSync).not.toBeCalled()
          done()
        }
      })

      it('should try to write to file data, which is received from the request, but throws error because writing to file fails', async done => {
        mockFunction(fs.existsSync, true)
        mockFunction(fs.readFileSync, JSON.stringify(exampleUser))
        //@ts-ignore
        fs.writeFile = jest.fn((path, data, format, cb) => cb('some error'))

        lib.requestReqres = getPromiseFunctionMock(exampleBodyWithUsers)

        try {
          await savePage(6)
          expect(savePage).toThrow()
        } catch (e) {
          expect(e).toEqual(new Error('some error'))
          expect(lib.requestReqres).toBeCalledWith('https://reqres.in/api/users?page=6')
          expect(fs.existsSync).toBeCalledWith('./users/users.json')
          expect(fs.readFileSync).toBeCalledWith('./users/users.json')
          expect(fs.writeFile).toBeCalledWith(
            './users/users.json',
            JSON.stringify([...exampleUser, ...exampleUser]),
            'utf8',
            expect.any(Function),
          )
          done()
        }
      })

      it('should try to write to file data, which is received from the request, but throws error because requesting Reqres.in fails', async done => {
        mockFunction(fs.existsSync, true)
        mockFunction(fs.readFileSync, JSON.stringify(exampleUser))
        //@ts-ignore
        fs.writeFile = jest.fn((path, data, format, cb) => cb('some error'))

        lib.requestReqres = getPromiseFunctionMock(exampleBodyWithUsers)

        try {
          await savePage(6)
          expect(savePage).toThrow()
        } catch (e) {
          expect(e).toEqual(new Error('some error'))
          expect(lib.requestReqres).toBeCalledWith('https://reqres.in/api/users?page=6')
          expect(fs.existsSync).toBeCalledWith('./users/users.json')
          expect(fs.readFileSync).toBeCalledWith('./users/users.json')
          expect(fs.writeFile).toBeCalledWith(
            './users/users.json',
            JSON.stringify([...exampleUser, ...exampleUser]),
            'utf8',
            expect.any(Function),
          )
          done()
        }
      })
    })

    describe('writeToFile():', () => {
      it('should try to write given data to file', async done => {
        mockFunction(fs.existsSync, true)
        mockFunction(fs.readFileSync, JSON.stringify(exampleUser))
        //@ts-ignore
        fs.writeFile = jest.fn((path, data, format, cb) => cb())

        try {
          await lib.writeToFile(exampleUser)
          expect(fs.existsSync).toBeCalledWith('./users/users.json')
          expect(fs.readFileSync).toBeCalledWith('./users/users.json')
          expect(fs.writeFile).toBeCalledWith(
            './users/users.json',
            JSON.stringify([...exampleUser, ...exampleUser]),
            'utf8',
            expect.any(Function),
          )
          done()
        } catch (e) {
          expect(lib.writeToFile).not.toThrow()
        }
      })

      it('should try to write given data to file, but reject the Promise because writeFile method fails', async done => {
        mockFunction(fs.existsSync, false)
        //@ts-ignore
        fs.writeFile = jest.fn((path, data, format, cb) => cb('some error'))

        try {
          await lib.writeToFile(exampleUser)
          expect(lib.writeToFile).toThrow()
        } catch (e) {
          expect(e).toEqual('some error')
          expect(fs.existsSync).toBeCalledWith('./users/users.json')
          expect(fs.writeFile).toBeCalledWith(
            './users/users.json',
            JSON.stringify(exampleUser),
            'utf8',
            expect.any(Function),
          )
          done()
        }
      })
    })

    describe('getPagesInfo():', () => {
      it('should return a Page object', async done => {
        lib.requestReqres = getPromiseFunctionMock(exampleBody)
        try {
          const response = await getPagesInfo()
          expect(lib.requestReqres).toBeCalledWith('https://reqres.in/api/users?page=1')
          expect(response).toEqual(examplePage)
          done()
        } catch (e) {
          expect(getPagesInfo).not.toThrow()
        }
      })

      it('should throw an error because requestReqres function returnes wrong format string', async done => {
        lib.requestReqres = getPromiseFunctionMock('@')
        try {
          const response = await getPagesInfo()
          expect(getPagesInfo).toThrow()
        } catch (e) {
          expect(e).toEqual(new SyntaxError('Unexpected token @ in JSON at position 0'))
          expect(lib.requestReqres).toBeCalledWith('https://reqres.in/api/users?page=1')
          done()
        }
      })
    })
  })
})

const exampleUser: Array<User['data']> = [
  {
    id: 1,
    email: 'a',
    first_name: 'b',
    last_name: 'c',
    avatar: 'd',
  },
]

const exampleBody = '{"total_pages": 10,  "total": 60,  "per_page": 6,  "page": 0,  "data": []}'
const examplePage: Page = {
  total_pages: 10,
  total: 60,
  per_page: 6,
  page: 0,
  data: [],
}
const exampleBodyWithUsers = JSON.stringify({
  total_pages: 10,
  total: 60,
  per_page: 6,
  page: 0,
  data: exampleUser,
})
