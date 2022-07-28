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
    const fileName = Date.now();
    const updateFileName = fileName + ext;
    cb(null, updateFileName);
  },
});

const upload = multer({ storage: storage });

router.get("/user", user);
router.put(
  "/profile-update",
  upload.any(),
  profileUpdateRequest,
  profileUpdate
);

module.exports = router;
