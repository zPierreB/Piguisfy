import fs from 'fs'

import { findAllAlbumsByUserId, addOneAlbum, find6LatestAlbums, findOneAlbumById, findOneAlbumByIdAndUserId, updateOneAlbumById, deleteOneAlbumById } from '../models/album.model.js'
import { findOneArtistByUserId } from '../models/artist.model.js'
import { findAllTracksByAlbumId } from '../models/track.model.js'

import splitFirstOccurrence from '../utils/splitFirstOccurence.js'

export const get6LatestAlbums = async (req, res) => {
  const albums = await find6LatestAlbums()
  return res.status(200).json(albums)
}

export const getAllAlbumsByUser = async (req, res) => {
  const userId = req.user.id

  const albums = await findAllAlbumsByUserId([userId])
  return res.status(200).json(albums)
}

export const getOneAlbumById = async (req, res) => {
  const albumId = req.params.id

  const album = await findOneAlbumById([albumId])
  const tracks = await findAllTracksByAlbumId([albumId])
  return res.status(200).json({album, tracks})
}

export const getOneAlbumByIdAndUserId = async (req, res) => {
  const userId = req.user.id
  const albumId = req.params.id

  const album = await findOneAlbumByIdAndUserId([userId, albumId])
  const tracks = await findAllTracksByAlbumId([albumId])
  return res.status(200).json({ album, tracks })
}

export const add1Album = async (req, res) => {

  const artist = await findOneArtistByUserId([req.user.id])

  if(artist.length < 1) {
    return res.status(403).json({ message: "No artist found" })
  } else {
    if(req.file.path === undefined) {
      return res.status(403).json({ message: "Please upload a file in mp3, wav or mpeg format" })
    }
    const path = req.file.path.replace(/\\/g, "/")
    const pathToPost = splitFirstOccurrence(path, '/')
    
    await addOneAlbum([req.body.name, req.body.releaseDate, pathToPost.remainder, artist[0].id])
    .then((album) => {
      res.status(200).json({ message: 'Album added successfully.' })
    })
    .catch((error) => res.status(500).json({ message: 'Error during the creation of an album.' })
    )
  }
}

export const update1Album = async (req, res) => {
  const userId = req.user.id
  const albumId = req.params.id
  const previousImage = await findOneAlbumById([albumId])

  if(req.file === undefined) {
    await updateOneAlbumById([req.body.name, req.body.releaseDate, req.body.image, albumId, userId])
    .then((album) => {
      res.status(200).json({ message: 'Album updated successfully.' })
    })
    .catch((error) => res.status(500).json({ message: 'Error during the update of an album 1.' }))
  } else {
    const path = req.file.path.replace(/\\/g, "/")
    const pathToPost = splitFirstOccurrence(path, '/')

    await updateOneAlbumById([req.body.name, req.body.releaseDate, pathToPost.remainder, albumId, userId])
    .then((album) => {
      fs.unlink(`./public/${previousImage[0].image}`, (err) => {
        if(err) {
          console.error(err)
          return
        }
      })
      res.status(200).json({ message: 'Album updated successfully.' })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: 'Error during the update of an album 2.' })})
  }

}
export const delete1AlbumById = async (req, res) => {
  const userId = req.user.id
  const albumId = req.params.id

  const album = await findOneAlbumById([albumId])
  if(album.length < 1) {
    return res.status(403).json({ message: "No album found" })
  } else {
    await deleteOneAlbumById([albumId, userId])
    .then(() => {
      fs.unlink(`./public/${album[0].image}`, (err) => {
        if(err) {
          console.log('err: ', err)
          return
        }
      })
      res.status(200).json({ message: 'Album deleted successfully.' })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: 'Error during the deletion of an album.' })
    })
  }
}