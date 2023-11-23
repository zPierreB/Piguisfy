import express from 'express'
const router = express.Router()

import isAuthenticated from '../middleware/isAuthenticate.js'
import { register, login, logout, verify, getConnectedUserData } from '../controllers/user.controller.js'
import { get6LatestPlaylists, getOnePlaylistById } from '../controllers/playlist.controller.js'
import { get6LatestAlbums, getOneAlbumById } from '../controllers/album.controller.js'
import uploadImage from '../middleware/uploadImage.js';

router.post('/register', uploadImage, register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verify', isAuthenticated, verify);
router.get('/connected-user', isAuthenticated, getConnectedUserData);

router.get('/playlists', isAuthenticated, get6LatestPlaylists)
router.get('/playlist/:id', isAuthenticated, getOnePlaylistById)

router.get('/albums', isAuthenticated, get6LatestAlbums)
router.get('/album/:id', isAuthenticated, getOneAlbumById)

export default router