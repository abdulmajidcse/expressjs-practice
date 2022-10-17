const express = require("express");
const {
  register,
  login,
  forgotPassword,
} = require("../controllers/guestController");
const registerRequest = require("./../requests/registerRequest");
const loginRequest = require("./../requests/loginRequest");
const forgotPasswordRequest = require("../requests/forgotPasswordRequest");
const router = express.Router();

router.post("/register", registerRequest, register);
router.post("/login", loginRequest, login);
// forgot and recover password routes
router.post("/forgot-password", forgotPasswordRequest, forgotPassword);

module.exports = router;
