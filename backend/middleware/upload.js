import multer from 'multer';

import checkFileType from '../utils/checkFileType.js';

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const allowedTypes = /mp3|wav|ogg|flac|mpeg/;

// Set up multer upload middleware
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, allowedTypes, cb);
  },
}).single('audioFile')

export default uploadFile;
