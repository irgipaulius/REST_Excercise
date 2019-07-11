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

function writeToFile(url: string, filename: string) {
  request.get(url, undefined, (err, res, body) => {
    if (!err) {
      fs.writeFile(filename, Buffer.from(body).toString('base64'), () => {})
    }
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

export async function getAvatar(userId: string) {
  const avatar = findFile(getAvatarFilename(userId))
  if (avatar) {
    return avatar
  } else {
    const user: User = await getUserById(userId)
    if (user && user.data && user.data.avatar) {
      writeToFile(user.data.avatar, getAvatarFilename(user.data.id.toString()))
      return Buffer.from(user.data.avatar).toString('base64')
    } else {
      return ''
    }
  }
}

function getAvatarFilename(userId: string) {
  const filename: string = path.join('avatars/', userId.toString(), '_avatar.file')
  return filename
}

function findFile(filename: string) {
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename)
  } else {
    return ''
  }
}
