import express from 'express'
const router = express.Router()

import { getAllAlbums } from '../controllers/album.controller.js'

router.get('/', getAllAlbums)