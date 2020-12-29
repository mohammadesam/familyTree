const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("Users", userSchema);
