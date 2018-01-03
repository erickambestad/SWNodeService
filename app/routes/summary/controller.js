const Promise = require("bluebird");

// Question model
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

// session helper
const checkSession = require("../helpers").checkSession;

/**
 * Controller function that connects the /summary GET endpoint
 *
 * @param {Object} req
 * @param {Object} res
 */
function getSummaryCallback(req, res) {
  // Check the user, errors go all the way to the catch
  checkSession(req)
    .then(session_id => {
      // Grab all questions
      const questionsPromise = Question.find();
      // Grab all users' answers
      const answersPromise = Answer.find({ session_id, });

      // Resolve promises and return to response
      return Promise.all([ questionsPromise, answersPromise, ]).then(results => {
        const answers = results[1];

        // Create object map to make the question lookup and answer append much faster and easier
        const answersObj = answers.reduce((prev, answer) => {
          if (prev.hasOwnProperty(answer.question_id)) {
            prev[answer.question_id].push(answer);
          } else {
            prev[answer.question_id] = [answer,];
          }
          return prev;
        }, {});

        // Loop through questions and append the answers from map before sending as response
        let questions = results[0];
        const result = questions.map(q => {
          const questionId = q._id.toString();
          const question = {
            id: questionId,
            question: q.text,
          };
          question.answers = answersObj.hasOwnProperty(questionId)
            ? answersObj[questionId]
            : [];
          return question;
        });
        res.json(result);
      });
    })
    .catch(error => {
      res.status(400).json({ error, });
    });
}

// Export the start controller module
module.exports = {
  getSummaryCallback,
};
