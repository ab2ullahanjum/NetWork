const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
  destination: "./static/uploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({
  storage: Storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

