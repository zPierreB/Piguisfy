import { addOneTrack } from "../models/track.model.js";
import { findOneAlbumByIdAndUserId } from "../models/album.model.js";

export const add1Track = async (req, res, next) => {
  console.log('req.body: ', req.body)
  // Check if the album exists and belongs to the user
  const album = await findOneAlbumByIdAndUserId([req.user.id, req.body.album])
  console.log('album: ', album)
  if(album.length < 1) {
    return res.status(403).json({ message: 'Unauthorized empty' })
  } else {
    // Correct the path of the file
    const newPath = req.file.path.replace(/\\/g, "/")
    
    // Format the duration of the track in seconds
    const duration = Math.ceil(req.body.duration)
    
    await addOneTrack([req.file.originalname, duration, newPath, album[0].id])
    .then((track) => {
      console.log('track: ', track)
      res.status(200).json({ message: 'Track added successfully.' })
    })
    .catch((error) => res.status(500).json({ message: 'Error during the creation of a music.' }))
  }
}