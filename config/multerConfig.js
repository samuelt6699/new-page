const multer = require('multer');

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeFilename = `${timestamp}-${file.originalname}`.replace(/\\/g, '/');
    cb(null, safeFilename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;