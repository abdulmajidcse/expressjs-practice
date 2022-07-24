const express = require("express");
const { userIndex, userStore } = require("../controllers/usersController");
const userStoreRequest = require("./../requests/userStoreRequest");
const router = express.Router();

router.get("/", userStore);
router.post("/", userStoreRequest, userStore);

module.exports = router;
