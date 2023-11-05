import express from 'express'
const router = express.Router()

import isAuthenticated from '../middleware/isAuthenticate.js'
import { register, login, logout, verify, getConnectedUserData } from '../controllers/user.controller.js'
import uploadImage from '../middleware/uploadImage.js';

router.post('/register', uploadImage, register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/verify', isAuthenticated, verify);
router.get('/getConnectedUser', isAuthenticated, getConnectedUserData);

export default router