import express from 'express'
const router = express.Router()

import { getAllAlbumsByUser } from '../controllers/album.controller.js'

router.get('/', getAllAlbumsByUser)

// TODO TO REMOVE ???