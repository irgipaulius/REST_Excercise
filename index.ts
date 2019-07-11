import express from 'express'
import { startServer } from './server'
import getUser from './handlers/user/{userId}'

const app = startServer(3000)
