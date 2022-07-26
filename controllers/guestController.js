const { matchedData, validationResult } = require("express-validator");
const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");
const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("./../config/mail");

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const validateData = matchedData(req);

  try {
    const bcryptPassword = await bcrypt.hash(validateData.password, 10);
    const user = await User.create({
      ...validateData,
      password: bcryptPassword,
    });
    res.json(
      successResource(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
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
      const token = await jwt.sign(
        { id: authUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: expiresIn,
        }
      );
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

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  try {
    const validateData = matchedData(req);

    // sending mail
    await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: validateData.email,
      subject: "Password Recovery Code",
      html: `<h3>Hello,</h3><p>You just request to recover your password. Your password recovery code is given below.</p><p><b>${parseInt(
        Math.random().toString().substr(2, 6)
      )}</b></p><p>Thank you!</p>`,
    });

    res.json(
      successResource(
        [],
        200,
        "We have sent password recovery code to your email address"
      )
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        errorResource([], 500, "Something went wrong. Please, try again later.")
      );
  }
};

module.exports = { register, login, forgotPassword };
