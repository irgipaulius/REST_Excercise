import request from 'request'
import path from 'path'
import http from 'http'
import fs from 'fs'

export interface User {
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
    [x: string]: any
  }
}

function requestReqres(url: string) {
  return new Promise<string>((resolve, reject) => {
    request.get(url, undefined, (err, res, body) => {
      if (err) {
        reject(err)
      }
      resolve(body)
    })
  })
}

async function writeToFile(url: string, filename: string) {
  return new Promise<string>((resolve, reject) => {
    request.get(url, undefined, (err, res, body) => {
      if (!err) {
        fs.writeFile(filename, Buffer.from(body).toString('base64'), err => {
          if (!err) {
            resolve(filename)
          } else {
            console.error(err)
            reject(err)
          }
        })
      } else {
        console.error(err)
        reject(err)
      }
    })
  })
}

export async function getUserById(userId: string): Promise<User> {
  const userQuery: string = await requestReqres('https://reqres.in/api/users/' + userId)
  try {
    const user: User = JSON.parse(userQuery)
    return user
  } catch (err) {
    throw new Error(`failed parsing response\n${userQuery}\nError: ${err}`)
  }
}

export async function deleteAvatar(userId: string) {
  const filename: string = getAvatarFilename(userId)
  fs.unlinkSync(filename)
  return ''
}

export async function getAvatar(userId: string) {
  const avatar = findFile(getAvatarFilename(userId))
  if (avatar) {
    return avatar
  } else {
    const user: User = await getUserById(userId)
    if (user && user.data && user.data.avatar) {
      const file: string = await writeToFile(
        user.data.avatar,
        getAvatarFilename(user.data.id.toString()),
      )
      return findFile(file)
    } else {
      return ''
    }
  }
}

function getAvatarFilename(userId: string) {
  const filename: string = path.join('avatars/', userId.toString() + '_avatar.txt')
  return filename
}

function findFile(filename: string) {
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename).toString()
  } else {
    return ''
  }
}
