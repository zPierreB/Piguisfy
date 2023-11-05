import { findAllAlbumsByUserId, addOneAlbum } from '../models/album.model.js'
import { findOneArtistByUserId } from '../models/artist.model.js'

export const getAllAlbumsByUser = async (req, res) => {
  const userId = req.user.id

  const albums = await findAllAlbumsByUserId([userId])
  return res.status(200).json(albums)
}

export const add1Album = async (req, res) => {

  const artist = await findOneArtistByUserId([req.user.id])

  if(artist.length < 1) {
    return res.status(403).json({ message: "No artist found" })
  } else {
    if(req.file.path === undefined) {
      return res.status(403).json({ message: "Please upload a file in mp3, wav or mpeg format" })
    }
    const newPath = req.file.path.replace(/\\/g, "/").split('/')[1]
    
    await addOneAlbum([req.body.name, req.body.releaseDate, newPath, artist[0].id])
    .then((album) => {
      res.status(200).json({ message: 'Album added successfully.' })
    })
    .catch((error) => res.status(500).json({ message: 'Error during the creation of an album.' })
    )
  }
}