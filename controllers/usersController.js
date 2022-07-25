const { matchedData, validationResult } = require("express-validator");
const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");
const User = require("./../models/user");

const userIndex = (req, res) => {
  res.send("post index route");
};

const userStore = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const validateData = matchedData(req);

  try {
    res.json(successResource(await User.create(validateData)));
  } catch (error) {
    res.json(errorResource([], 500, error.message));
  }

  // res.json(successResource(validateData));
};

module.exports = { userIndex, userStore };
