const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/xml' || file.mimetype === 'application/xml') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only XML allowed!'), false);
    }
};

module.exports = multer({ storage, fileFilter });
