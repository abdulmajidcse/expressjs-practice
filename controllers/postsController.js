const { matchedData, validationResult } = require("express-validator");
const errorResource = require("./../resources/errorResource");
const successResource = require("./../resources/successResource");

const postIndex = (req, res) => {
  res.send("post index route");
};

const postStore = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const validateData = matchedData(req);

  res.json(successResource(validateData));
};

module.exports = { postIndex, postStore };
