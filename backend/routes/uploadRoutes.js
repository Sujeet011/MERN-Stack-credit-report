const express = require("express");
const multer = require("multer");
const { uploadXML } = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/xml" || file.mimetype === "application/xml") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only XML allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("file"), uploadXML);

module.exports = router;
