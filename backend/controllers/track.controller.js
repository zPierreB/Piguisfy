import { addOneTrack, deleteOneTrack, findOneTrackById } from "../models/track.model.js";
import { findOneAlbumByIdAndUserId } from "../models/album.model.js";
import fs from 'fs'

import splitFirstOccurrence from '../utils/splitFirstOccurence.js'

export const add1Track = async (req, res) => {

  // Check if the album exists and belongs to the user
  const album = await findOneAlbumByIdAndUserId([req.user.id, req.body.album])

  if(album.length < 1) {
    return res.status(403).json({ message: "There's no file provided." })
  } else {
    // Correct the path of the file
    if(req.file.path === undefined) {
      return res.status(403).json({ message: "Please upload a file in mp3, wav or mpeg format" })
    }
    const path = req.file.path.replace(/\\/g, "/")
    const pathToPost = splitFirstOccurrence(path, '/')
    
    // Format the duration of the track in seconds
    const duration = Math.ceil(req.body.duration)
    
    await addOneTrack([req.file.originalname, duration, pathToPost.remainder, album[0].id])
    .then((track) => {
      res.status(200).json({ message: 'Track added successfully.' })
    })
    .catch((error) => res.status(500).json({ message: 'Error during the creation of a music.' }))
  }
}

export const delete1Track = async (req, res) => {
  const albumId = req.params.id
  const trackId = req.params.trackId

  const trackFound = await findOneTrackById([trackId])

  if(trackFound.length < 1) {
    return res.status(403).json({ message: "No track found" })
  } else {
    await deleteOneTrack([trackId, albumId])
    .then((track) => {
      fs.unlink(`./public/${trackFound[0].path}`, (err) => {
        if(err) {
          console.log('err: ', err)
          return
        }
      })
      res.status(200).json({ message: 'Track deleted successfully.' })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: 'Error during the deletion of a track.' })
    })
  }
}