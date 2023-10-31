import { findAllAlbumsByUserId } from '../models/album.model.js'

export const getAllAlbumsByUser = async (req, res) => {
  const userId = req.user.id

  const albums = await findAllAlbumsByUserId([userId])
  res.status(200).json(albums)
}