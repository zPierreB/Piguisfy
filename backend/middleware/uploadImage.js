import multer from 'multer';

import checkFileType from '../utils/checkFileType.js';

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const allowedTypes = /png|jpg|jpeg/;

// Set up multer upload middleware
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, allowedTypes, cb);
  },
}).single('image')

export default uploadImage;
