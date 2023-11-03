import express from 'express'
const router = express.Router()

import { add1Track } from '../controllers/track.controller.js'
import { getAllAlbumsByUser, add1Album } from '../controllers/album.controller.js'

import isAuthenticated from '../middleware/isAuthenticate.js'
import uploadAudio from '../middleware/uploadAudio.js';
import uploadImage from '../middleware/uploadImage.js';

// router.get('/', findAllPlaylists)
router.get('/albums', isAuthenticated, getAllAlbumsByUser)

router.post('/addsong',  isAuthenticated, uploadAudio, add1Track)
router.post('/addalbum',  isAuthenticated, uploadImage, add1Album)

export default router