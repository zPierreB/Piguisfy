import path from 'path';
import { getAudioDurationInSeconds } from 'get-audio-duration';

import uploadFile from "../middleware/upload.js";
import { addOneTrack } from "../models/track.model.js";

export const add1Track = async (req, res, next) => {
  getAudioDurationInSeconds(req.files.file.name).then((duration) => {
    console.log(req.files.file.name)
    console.log(duration)
})
  // uploadFile(req, res, (err) => {
  //   if (err) {
  //     return res.status(400).send({ message: "Please upload a file!" });
  //   }
  //   console.log(req.file);
  // })

  await addOneTrack([req.body.name, 120, 'path', 1])
  .then((track) => {
    let audio = req.files.file
    console.log(audio.duration)
    console.log('track: ', track)
    // res.status(200).json({ message: 'Track added successfully.' })
  })
  .catch((error) => res.status(500).json({ message: 'Error during the creation of a music.' }))
}