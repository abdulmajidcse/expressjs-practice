const express = require("express");
const { user, profileUpdate } = require("../controllers/authController");
const profileUpdateRequest = require("../requests/profileUpdateRequest");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { randomUUID } = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = path.extname(file.originalname);
    const fileName = randomUUID() + ext;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "photo") {
      const mimeType = file.mimetype;
      if (
        mimeType === "image/jpg" ||
        mimeType === "image/jpeg" ||
        mimeType === "image/png"
      ) {
        // accept the file
        return cb(null, true);
      } else {
        // reject the file
        const error = [
          {
            msg: "Only jpg, jpeg and png format allowed",
            param: "photo",
            location: "body",
          },
        ];
        return cb(error, false);
      }
    } else {
      // reject this file
      cb(null, false);
    }
  },
});

router.get("/user", user);
router.put(
  "/profile-update",
  upload.any(),
  profileUpdateRequest,
  profileUpdate
);

module.exports = router;
