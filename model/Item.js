const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignee: {
    type: String,
  },
});

module.exports = mongoose.model("Item", itemSchema);
