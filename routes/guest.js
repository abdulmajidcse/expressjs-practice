const express = require("express");
const { register } = require("../controllers/guestController");
const registerRequest = require("./../requests/registerRequest");
const router = express.Router();

router.post("/register", registerRequest, register);

module.exports = router;
