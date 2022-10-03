const express = require("express");
const { user, profileUpdate } = require("../controllers/authController");
const profileUpdateRequest = require("../requests/profileUpdateRequest");
const router = express.Router();
const profileUpdateFileRequest = require("./../requests/profileUpdateFileRequest");

router.get("/user", user);
router.put(
  "/profile-update",
  profileUpdateFileRequest.any(),
  profileUpdateRequest,
  profileUpdate
);

module.exports = router;
