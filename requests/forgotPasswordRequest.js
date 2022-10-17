const { checkSchema } = require("express-validator");
const User = require("../models/user");

const forgotPasswordRequest = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
    custom: {
      options: async (value) => {
        // user exist or not by this email
        if (!(await User.findOne({ email: value }))) {
          return Promise.reject("Email is invalid");
        }
      },
    },
  },
});

module.exports = forgotPasswordRequest;
