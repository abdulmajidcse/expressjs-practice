const express = require("express");
const { user } = require("../controllers/authController");
const router = express.Router();

router.get("/user", user);

module.exports = router;
