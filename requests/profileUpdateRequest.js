const { checkSchema } = require("express-validator");
const User = require("../models/user");

const profileUpdateRequest = checkSchema({
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
      options: (value, { req }) => {
        if (req.user.email === value) return true;
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
});

module.exports = profileUpdateRequest;
