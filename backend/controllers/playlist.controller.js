import { findAllPlaylistsByUserId, addOnePlaylist } from '../models/playlist.model.js'

import splitFirstOccurrence from '../utils/splitFirstOccurence.js'
export const getAllPlaylistsByUserId = async (req, res) => {
  const userId = req.user.id

  const playlists = await findAllPlaylistsByUserId([userId])
  return res.status(200).json(playlists)
}

export const add1Playlist = async (req, res) => {
  const userId = req.user.id

  if(req.file.path === undefined) {
    return res.status(403).json({ message: "Please upload a file in mp3, wav or mpeg format" })
  }
  const path = req.file.path.replace(/\\/g, "/")
  const pathToPost = splitFirstOccurrence(path, '/')
  console.log('pathToPost: ', pathToPost)

  await addOnePlaylist([req.body.name, pathToPost.remainder, userId])
  .then((playlist) => {
    res.status(200).json({ message: 'Playlist added successfully.' })
  })
  .catch((error) => res.status(500).json({ message: 'Error during the creation of a playlist.' })
  )
}