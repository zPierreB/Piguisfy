const checkFileType = (file, allowedTypes, cb) => {
  const fileTypes = allowedTypes;

  // const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = fileTypes.test(file.mimetype);

  if(mimetype){
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

export default checkFileType;