const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  originalPassword: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
