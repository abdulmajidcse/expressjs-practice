const { checkSchema } = require("express-validator");
const User = require("./../models/user");

const registerRequest = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
    custom: {
      options: (value) => {
        return User.findOne()
          .where("email")
          .equals(value)
          .exec()
          .then((user) => {
            if (user) return Promise.reject("This email is already exist");
          });
      },
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must at least 8 characters",
    },
  },
  password_confirmation: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      },
    },
  },
});

module.exports = registerRequest;
