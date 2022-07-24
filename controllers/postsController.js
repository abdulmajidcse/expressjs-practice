const { matchedData, validationResult } = require("express-validator");

const postIndex = (req, res) => {
  res.send("post index route");
};

const postStore = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorCode: 422,
      errorMessage: "Error occuired",
      errors: errors.array(),
    });
  }

  const validateData = matchedData(req);

  res.json({
    statusCode: 200,
    statusMessage: "Post Store Route",
    data: { ...validateData },
    photo: req.file,
  });
};

module.exports = { postIndex, postStore };
