const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");
const jwt = require("jsonwebtoken");

const user = (req, res) => {
  return res.json(successResource(req.auth.user));
};

module.exports = { user };
