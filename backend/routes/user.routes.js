import express from 'express'
const router = express.Router()
import { register, login, logout, verify } from '../controllers/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticate.js'
import uploadImage from '../middleware/uploadImage.js';

router.post('/register', uploadImage, register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/verify', isAuthenticated, verify)

export default router