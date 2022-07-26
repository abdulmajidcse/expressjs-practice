const jwt = require("jsonwebtoken");
const successResource = require("../resources/successResource");
const errorResource = require("../resources/errorResource");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, token] = authorization ? authorization.split(" ") : [];

  if (tokenType === "Bearer" && token) {
    try {
      const { id } = await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(id).select({ password: 0, __v: 0 });
      req.auth = { user: user };
      return next();
    } catch (error) {
      return res.json(errorResource([], 401, "Authentication failed"));
    }
  } else {
    return res.json(errorResource([], 401, "Authentication failed"));
  }
};

module.exports = authenticate;
