import express from 'express'
const router = express.Router()
import { login, logout, verify } from '../controllers/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticate.js'

router.post('/login', login)
router.get('/logout', logout)
router.get('/verify', isAuthenticated, verify)

export default router