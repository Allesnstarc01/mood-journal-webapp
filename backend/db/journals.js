const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String,
  value: String,
  quotes: String,
  createdDate: String,
});

module.exports = mongoose.model("journals", userSchema);
