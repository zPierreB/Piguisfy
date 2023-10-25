import { findAllAlbums } from '../models/album.model.js'

export const getAllAlbums = async (req, res) => {
  const albums = await findAllAlbums()
  res.status(200).json(albums)
}