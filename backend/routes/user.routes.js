import express from 'express'
const router = express.Router()
import { login, logout } from '../controllers/user.controller.js'

router.post('/login', login)

router.get('/logout', logout)

export default router