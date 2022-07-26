const express = require("express");
const { user, profileUpdate } = require("../controllers/authController");
const profileUpdateRequest = require("../requests/profileUpdateRequest");
const router = express.Router();

router.get("/user", user);
router.put("/profile-update", profileUpdateRequest, profileUpdate);

module.exports = router;
