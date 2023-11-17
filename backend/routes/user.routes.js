import express from 'express'
const router = express.Router()

import isAuthenticated from '../middleware/isAuthenticate.js'
import { register, login, logout, verify, getConnectedUserData } from '../controllers/user.controller.js'
import { get5LatestPlaylists } from '../controllers/playlist.controller.js'
import uploadImage from '../middleware/uploadImage.js';

router.post('/register', uploadImage, register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verify', isAuthenticated, verify);
router.get('/connected-user', isAuthenticated, getConnectedUserData);

router.get('/playlists', isAuthenticated, get5LatestPlaylists)


export default router