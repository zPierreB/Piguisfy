import { addOneTrackToPlaylist, deleteOneTrackFromPlaylist } from '../models/playlist-track.model.js'

export const add1TrackToPlaylist = async (req, res) => {
  const playlistId = req.params.id
  const trackId = req.params.trackId

  await addOneTrackToPlaylist([playlistId, trackId])
  .then((track) => {
    res.status(200).json({ message: 'Track added successfully.' })
  })
  .catch((error) => res.status(500).json({ message: 'Error during the creation of a music.' }))
}

export const delete1TrackFrom1Playlist = async (req, res) => {
  const playlistId = req.params.id
  const trackId = req.params.trackId

  await deleteOneTrackFromPlaylist([playlistId, trackId])
  .then((track) => {
    res.status(200).json({ message: 'Track deleted successfully.' })
  })
  .catch((error) => res.status(500).json({ message: 'Error during the deletion of a track.' }))
}