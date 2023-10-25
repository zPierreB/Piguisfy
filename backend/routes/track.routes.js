import express from 'express'
const router = express.Router()

import { add1Track } from '../controllers/track.controller.js'
import uploadFile from '../middleware/upload.js';

// router.get('/', findAllPlaylists)
router.post('/addsong', add1Track)

export default router