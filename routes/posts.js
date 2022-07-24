const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const { postIndex, postStore } = require("./../controllers/postsController");
const postStoreRequest = require("./../requests/postStoreRequest");

router.get("/", postIndex);
// router.post("/", upload.single("photo"), postStore);
router.post("/", postStoreRequest, postStore);

module.exports = router;
