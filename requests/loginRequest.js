const { checkSchema } = require("express-validator");
const User = require("../models/user");

const loginRequest = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isString: {
      errorMessage: "Email must be a string",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
  },
});

module.exports = loginRequest;
