const { matchedData, validationResult } = require("express-validator");
const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");
const User = require("./../models/user");

const userIndex = (req, res) => {
  res.send("post index route");
};

const userStore = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const validateData = matchedData(req);

  try {
    res.json(
      successResource(await User.create(validateData), 201, "User created")
    );
  } catch (error) {
    res.status(422).json(errorResource([], 422, error.message));
  }
};

module.exports = { userIndex, userStore };
