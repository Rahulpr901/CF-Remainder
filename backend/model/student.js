const { CursorTimeoutMode } = require("mongodb");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  handle: String,
  CurrentRating:Number,
  MaxRating:Number,
});
module.exports = mongoose.model("Student", studentSchema);