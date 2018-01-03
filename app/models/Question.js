// Question Model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
