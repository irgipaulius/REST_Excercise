import fs from 'fs'
import request from 'request'
import { User, Page } from '../types'
import { isArray } from 'util'

const UsersListFilename = './users/users.json'

export async function getPagesInfo(): Promise<Page> {
  return JSON.parse(await requestReqres('https://reqres.in/api/users?page=1'))
}

export async function savePage(pageIndex: number) {
  try {
    const page: Page = JSON.parse(
      await requestReqres('https://reqres.in/api/users?page=' + pageIndex.toString()),
    )

    const users: Array<User['data']> = page.data
    if (users && isArray(users) && users.length > 0) {
      await writeToFile(users)
    }
  } catch (err) {
    throw new Error(err)
  }
}

async function writeToFile(users: Array<User['data']>) {
  return new Promise<string>((resolve, reject) => {
    if (fs.existsSync(UsersListFilename)) {
      const usersList: Array<User['data']> = JSON.parse(
        fs.readFileSync(UsersListFilename).toString(),
      )
      users = [...usersList, ...users]
    }
    fs.writeFile(UsersListFilename, JSON.stringify(users), 'utf8', err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function requestReqres(url: string) {
  return new Promise<string>((resolve, reject) => {
    request.get(url, undefined, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}
