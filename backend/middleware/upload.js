import multer from 'multer';

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Set up multer upload middleware
const uploadFile = multer({ storage: storage })

export default uploadFile;
