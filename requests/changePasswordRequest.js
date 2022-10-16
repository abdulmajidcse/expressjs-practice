const { checkSchema } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const changePasswordRequest = checkSchema({
  old_password: {
    notEmpty: {
      errorMessage: "Old Password is required",
    },
    isString: {
      errorMessage: "Old Password must be a string",
    },
    custom: {
      options: async (value, { req }) => {
        // get authenticated user with password and try to match old password
        const authUser = await User.findOne({ email: req.user.email });
        if (
          authUser &&
          (await bcrypt.compare(value ?? "", authUser.password))
        ) {
          return true;
        } else {
          return Promise.reject("Old Password did not match");
        }
      },
    },
  },
  new_password: {
    notEmpty: {
      errorMessage: "New Password is required",
    },
    isString: {
      errorMessage: "New Password must be a string",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "New Password must at least 8 characters",
    },
  },
  new_password_confirmation: {
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.new_password) {
          throw new Error(
            "New Password confirmation does not match new password"
          );
        }
        return true;
      },
    },
  },
});

module.exports = changePasswordRequest;
