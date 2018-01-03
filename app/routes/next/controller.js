const Promise = require("bluebird");

// Question model
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

// session helper
const checkSession = require("../helpers").checkSession;

/**
 * Takes an array of questions, a question id to match and returns the next question in the sequence
 *
 * @param {Array} questions
 * @param {String} question_id
 */
function getNextQuestion(questions, question_id) {
  return new Promise(resolve => {
    const sortedQuestions = questions.sort((a, b) => a.order - b.order);
    const currentKey = sortedQuestions.reduce((prev, q, key) => {
      return q._id.toString() === question_id ? key : prev;
    }, null);

    let nextKey = 0;
    if (currentKey + 1 < sortedQuestions.length) {
      nextKey = currentKey + 1;
    }

    resolve(sortedQuestions[nextKey]);
  });
}

/**
 * Controller function that connects the /next POST endpoint
 *
 * @param {Object} req
 * @param {Object} res
 */
function postNextCallback(req, res) {
  // Check the user, errors go all the way to the catch
  return checkSession(req)
    .then(session_id => {
      // check to make sure we have an answer
      const answer = req.body.text;
      if (!answer) {
        throw new Error("No answer given");
      }
      // Check to make sure we have a question to work with
      const question_id = req.params.question_id;
      if (!question_id) {
        throw new Error("No question given");
      }
      // Save the answer to the current question, then get the next and retrieve its answers
      let answerObj = new Answer();
      answerObj.session_id = session_id;
      answerObj.question_id = question_id;
      answerObj.text = answer;
      return answerObj
        .save()
        .then(Question.find)
        .then(questions => {
          return getNextQuestion(questions, question_id);
        })
        .then(nextQuestion => {
          const questionId = nextQuestion._id.toString();
          return Answer.find({ session_id, question_id: questionId, }).then(
            answers => {
              const responseObj = {
                question: nextQuestion,
                answers: answers.filter(
                  answer => answer.question_id === questionId
                ),
              };
              res.status(200).json(responseObj);
            }
          );
        });
    })
    .catch(error => {
      res.status(400).json({ error: error.message, });
    });
}

// Export the next controller module
module.exports = {
  getNextQuestion,
  postNextCallback,
};
