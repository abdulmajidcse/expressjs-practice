const { matchedData, validationResult } = require("express-validator");
const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");

const userIndex = (req, res) => {
  res.send("post index route");
};

const userStore = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const validateData = matchedData(req);

  res.json(successResource(validateData));
};

module.exports = { userIndex, userStore };
