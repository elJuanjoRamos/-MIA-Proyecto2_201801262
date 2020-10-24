var express = require('express');
var multer = require('multer');
var fileRoute = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `data_${file.originalname}`)
    }
  })

  const upload = multer({ storage: storage })

fileRoute.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })


  module.exports = fileRoute;