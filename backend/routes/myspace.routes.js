import express from 'express'
const router = express.Router()

import { add1Track, delete1Track } from '../controllers/track.controller.js'
import { getAllAlbumsByUser, add1Album } from '../controllers/album.controller.js'
import { delete1TrackFrom1Playlist } from '../controllers/playlist-track.controller.js'

import isAuthenticated from '../middleware/isAuthenticate.js'
import uploadAudio from '../middleware/uploadAudio.js';
import uploadImage from '../middleware/uploadImage.js';
import { getAllPlaylistsByUserId, getOnePlaylistById, add1Playlist } from '../controllers/playlist.controller.js'

// router.get('/', findAllPlaylists)
router.get('/albums', isAuthenticated, getAllAlbumsByUser)
router.get('/playlists', isAuthenticated, getAllPlaylistsByUserId)

router.post('/addsong',  isAuthenticated, uploadAudio, add1Track)
router.post('/addalbum',  isAuthenticated, uploadImage, add1Album)

router.post('/addplaylist',  isAuthenticated, uploadImage, add1Playlist)
router.get('/playlist/:id', isAuthenticated, getOnePlaylistById)
router.delete('/playlist/:id/track/:trackId', isAuthenticated, delete1TrackFrom1Playlist)

router.delete('/delete-one-song/:id', isAuthenticated, delete1Track)

export default router