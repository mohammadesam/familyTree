const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  father: String,
  Father: String,
  mother: String,
  partner: Array,
  gender: String,
  sons: Array,
});

module.exports = mongoose.model("Person", personSchema);
