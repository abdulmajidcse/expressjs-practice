const mongoose = require("mongoose");

database = mongoose.connect("mongodb://localhost:27017/express_practice");

module.exports = database;
