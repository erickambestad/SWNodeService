// Answer Model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  session_id: {
    type: String,
    required: true,
  },
  question_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);
