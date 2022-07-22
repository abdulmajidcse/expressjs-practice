const express = require("express");
const router = express.Router();
const { postIndex, postStore } = require("./../controllers/postsController");

router.get("/", postIndex);
router.post("/", postStore);

module.exports = router;
