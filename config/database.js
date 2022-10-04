const mongoose = require("mongoose");

database = mongoose.connect(process.env.MONGODB_URL);

module.exports = database;
