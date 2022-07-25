const { matchedData, validationResult } = require("express-validator");
const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");
const User = require("./../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const validateData = matchedData(req);

  try {
    const bcryptPassword = await bcrypt.hash(validateData.password, 10);
    res.json(
      successResource(
        await User.create({ ...validateData, password: bcryptPassword }),
        201,
        "User registered successfully"
      )
    );
  } catch (error) {
    res.status(422).json(errorResource([], 422, error.message));
  }
};

module.exports = { register };
