const { matchedData, validationResult } = require("express-validator");
const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");
const User = require("../models/user");
const fs = require("fs");

const user = (req, res) => {
  return res.json(successResource(req.user));
};

const profileUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.files &&
      req.files.length > 0 &&
      (await fs.unlinkSync(req.files[0].path));
    return res.status(422).json(errorResource(errors.array(), 422));
  }

  const user = req.user;
  let validateData = matchedData(req);
  if (req.files && req.files.length > 0) {
    user.photo && (await fs.unlinkSync(`public/uploads/${user.photo}`));
    validateData.photo = req.files[0].filename;
  }

  await User.updateOne({ _id: user._id }, { ...validateData });
  const updatedUser = await User.findById(user.id).select({
    password: 0,
    __v: 0,
  });

  return res.json(
    successResource(updatedUser, 200, "User information updated")
  );
};

module.exports = { user, profileUpdate };
