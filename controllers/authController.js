const errorResource = require("../resources/errorResource");
const successResource = require("../resources/successResource");

const user = async (req, res) => {
  res.json(successResource(req.body));
};

module.exports = { user };
