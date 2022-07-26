const { matchedData, validationResult } = require("express-validator");
const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const validateData = matchedData(req);

  try {
    const authUser = await User.findOne({ email: validateData.email });
    if (
      authUser &&
      (await bcrypt.compare(validateData.password, authUser.password))
    ) {
      // generate jsonwebtoken and return to user
      const expiresIn = process.env.JWT_EXPIRES_IN ?? "30d";
      const token = await jwt.sign({ id: authUser._id }, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
      });
      res.json(
        successResource(
          { token: token, type: "Bearer", expiresIn: expiresIn },
          200,
          "User login token generated successfully"
        )
      );
    } else {
      res.status(401).json(errorResource([], 401, "Authentication failed"));
    }
  } catch (error) {
    res.status(401).json(errorResource([], 401, "Authentication failed"));
  }
};

module.exports = { register, login };
