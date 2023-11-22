import express from 'express'
const router = express.Router()

import { add1Track, delete1Track } from '../controllers/track.controller.js'
import { getAllAlbumsByUser, add1Album, delete1AlbumById, update1Album, getOneAlbumByIdAndUserId } from '../controllers/album.controller.js'
import { add1TrackToPlaylist, delete1TrackFrom1Playlist } from '../controllers/playlist-track.controller.js'
import { getAllPlaylistsByUserId, add1Playlist, delete1Playlist, update1Playlist, getOnePlaylistByIdAndUserId } from '../controllers/playlist.controller.js'

import isAuthenticated from '../middleware/isAuthenticate.js'
import uploadAudio from '../middleware/uploadAudio.js';
import uploadImage from '../middleware/uploadImage.js';

// router.get('/', findAllPlaylists)
router.get('/albums', isAuthenticated, getAllAlbumsByUser)
router.get('/album/:id', isAuthenticated, getOneAlbumByIdAndUserId)
router.post('/addalbum',  isAuthenticated, uploadImage, add1Album)
router.put('/album/:id', isAuthenticated, uploadImage, update1Album)
router.delete('/album/:id', isAuthenticated, delete1AlbumById)
router.delete('/album/:id/track/:trackId', isAuthenticated, delete1Track)

router.post('/addsong',  isAuthenticated, uploadAudio, add1Track)
router.delete('/playlist/:id/track/:trackId', isAuthenticated, delete1TrackFrom1Playlist)

router.get('/playlists', isAuthenticated, getAllPlaylistsByUserId)
router.get('/playlist/:id', isAuthenticated, getOnePlaylistByIdAndUserId)
router.post('/addplaylist',  isAuthenticated, uploadImage, add1Playlist)
router.put('/playlist/:id', isAuthenticated, uploadImage, update1Playlist)
router.post('/playlist/:id', isAuthenticated, delete1Playlist)

router.post('/playlist/:id/addtrack/:trackId', isAuthenticated, add1TrackToPlaylist)

// router.delete('/delete-one-song/:id', isAuthenticated, delete1Track)

export default router