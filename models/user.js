const mongoose = require("mongoose");
const { Schema } = mongoose;
require("./../config/database");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

// userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("UserDemo", userSchema);

module.exports = User;