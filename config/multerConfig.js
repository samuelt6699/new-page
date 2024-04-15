// multerConfig.js
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        // Use .replace() to ensure the file path will have forward slashes.
        const filename = Date.now() + '-' + file.originalname;
        const safeFilename = filename.replace(/\\/g, '/');
        cb(null, safeFilename);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;


