import fs from 'fs'

import { find6LatestPlaylists, findOnePlaylistById, findAllPlaylistsByUserId, findOnePlaylistByIdAndUserId, addOnePlaylist, updateOnePlaylistById, deleteOnePlaylistById } from '../models/playlist.model.js'
import { findAllTracksByPlaylistId } from '../models/playlist-track.model.js'

import splitFirstOccurrence from '../utils/splitFirstOccurence.js'

export const get6LatestPlaylists = async (req, res) => {
  const playlists = await find6LatestPlaylists()
  return res.status(200).json(playlists)
}

export const getOnePlaylistById = async (req, res) => {
  const playlistId = req.params.id

  const playlist = await findOnePlaylistById([playlistId])
  const tracks = await findAllTracksByPlaylistId([playlistId])
  return res.status(200).json({ playlist, tracks })
}

export const getAllPlaylistsByUserId = async (req, res) => {
  const userId = req.user.id

  const playlists = await findAllPlaylistsByUserId([userId])
  return res.status(200).json(playlists)
}

export const getOnePlaylistByIdAndUserId = async (req, res) => {
  const userId = req.user.id
  const playlistId = req.params.id

  const playlist = await findOnePlaylistByIdAndUserId([userId, playlistId])
  const tracks = await findAllTracksByPlaylistId([playlistId])
  return res.status(200).json({ playlist, tracks })
}

export const add1Playlist = async (req, res) => {
  const userId = req.user.id

  if(req.file.path === undefined) {
    return res.status(403).json({ message: "Please upload a file in mp3, wav or mpeg format" })
  }
  const path = req.file.path.replace(/\\/g, "/")
  const pathToPost = splitFirstOccurrence(path, '/')

  await addOnePlaylist([req.body.name, pathToPost.remainder, userId])
  .then((playlist) => {
    res.status(200).json({ message: 'Playlist added successfully.' })
  })
  .catch((error) => res.status(500).json({ message: 'Error during the creation of a playlist.' })
  )
}

export const update1Playlist = async (req, res) => {
  const userId = req.user.id
  const playlistId = req.params.id
  const previousImage = await findOnePlaylistById([playlistId])

  if(req.file === undefined) {
    await updateOnePlaylistById([req.body.name, req.body.image, playlistId, userId])
    .then((playlist) => {
      res.status(200).json({ message: 'Playlist edited successfully.' })
    })
    .catch((error) => res.status(500).json({ message: 'Error during the edition of a playlist.' })
    )
  } else {
    const path = req.file.path.replace(/\\/g, "/")
    const pathToPost = splitFirstOccurrence(path, '/')

    await updateOnePlaylistById([req.body.name, pathToPost.remainder, playlistId, userId])
    .then((playlist) => {
      fs.unlink(`./public/${previousImage[0].image}`, (err) => {
        if(err) {
          console.log('err: ', err)
          return
        }
      })
      res.status(200).json({ message: 'Playlist edited successfully.' })
    })
    .catch((error) => res.status(500).json({ message: 'Error during the edition of a playlist.' })
    )
  }
}

export const delete1Playlist = async (req, res) => {
  const userId = req.user.id
  const playlistId = req.params.id

  const playlistForImage = await findOnePlaylistById([playlistId])

  await deleteOnePlaylistById([playlistId, userId])
  .then((playlist) => {
    fs.unlink(`./public/${playlistForImage[0].image}`, (err) => {
      if(err) {
        console.log('err: ', err)
        return
      }
      console.log('file deleted successfully')
    })
    res.status(200).json({ message: 'Playlist deleted successfully.' })
  })
  .catch((error) => res.status(500).json({ message: 'Error during the deletion of a playlist.' })
  )
}