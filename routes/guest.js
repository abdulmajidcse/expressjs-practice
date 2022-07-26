const express = require("express");
const { register, login } = require("../controllers/guestController");
const registerRequest = require("./../requests/registerRequest");
const loginRequest = require("./../requests/loginRequest");
const router = express.Router();

router.post("/register", registerRequest, register);
router.post("/login", loginRequest, login);

module.exports = router;
