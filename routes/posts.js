const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/"});
const { postIndex, postStore } = require("./../controllers/postsController");

router.get("/", postIndex);
// router.post("/", upload.single("photo"), postStore);
router.post("/", postStore);

module.exports = router;
