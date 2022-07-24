const { checkSchema } = require("express-validator");

const postStoreRequest = checkSchema({
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
  },
});

module.exports = postStoreRequest;
