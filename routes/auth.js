const express = require("express");
const { user } = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/user", authenticate, user);

module.exports = router;
