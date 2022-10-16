const express = require("express");
const {
  user,
  profileUpdate,
  changePassword,
} = require("../controllers/authController");
const changePasswordRequest = require("../requests/changePasswordRequest");
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

router.put("/changed-password", changePasswordRequest, changePassword);

module.exports = router;
