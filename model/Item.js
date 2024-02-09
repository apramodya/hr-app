const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

module.exports = mongoose.model("Item", itemSchema);
