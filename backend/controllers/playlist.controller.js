import { findAllPlaylistsByUserId, findOnePlaylistByIdAndUserId, addOnePlaylist } from '../models/playlist.model.js'
import { findAllTracksByPlaylistId } from '../models/playlist-track.model.js'

import splitFirstOccurrence from '../utils/splitFirstOccurence.js'
export const getAllPlaylistsByUserId = async (req, res) => {
  const userId = req.user.id

  const playlists = await findAllPlaylistsByUserId([userId])
  return res.status(200).json(playlists)
}

export const getOnePlaylistById = async (req, res) => {
  const userId = req.user.id
  const playlistId = req.params.id

  console.log('userId: ', userId)
  console.log('playlistId: ', playlistId)

  const playlist = await findOnePlaylistByIdAndUserId([userId, playlistId])
  const tracks = await findAllTracksByPlaylistId([playlistId])
  return res.status(200).json({ playlist, tracks })
}

export const add1Playlist = async (req, res) => {
  const userId = req.user.id

  if(req.file.path === undefined) {
    return res.status(403).json({ message: "Please upload a file in mp3, wav or mpeg format" })
  }
  console.log(req.file.path)
  const path = req.file.path.replace(/\\/g, "/")
  console.log('path: ', path)
  const pathToPost = splitFirstOccurrence(path, '/')
  console.log('pathToPost: ', pathToPost)

  await addOnePlaylist([req.body.name, pathToPost.remainder, userId])
  .then((playlist) => {
    res.status(200).json({ message: 'Playlist added successfully.' })
  })
  .catch((error) => res.status(500).json({ message: 'Error during the creation of a playlist.' })
  )
}