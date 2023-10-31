import express from 'express'
const router = express.Router()

import { add1Track } from '../controllers/track.controller.js'
import { getAllAlbumsByUser } from '../controllers/album.controller.js'

import isAuthenticated from '../middleware/isAuthenticate.js'
import uploadFile from '../middleware/upload.js';

// router.get('/', findAllPlaylists)
router.get('/albums', isAuthenticated, getAllAlbumsByUser)
router.post('/addsong',  isAuthenticated, uploadFile, add1Track)

export default router