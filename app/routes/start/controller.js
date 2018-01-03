const Promise = require("bluebird");

// Question model
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

// session helper
const checkSession = require("../helpers").checkSession;

/**
 * Controller function that connects the /start GET endpoint
 *
 * @param {Object} req
 * @param {Object} res
 */
function getStartCallback(req, res) {
  // Check the user, errors go all the way to the catch
  checkSession(req)
    .then(session_id => {
      // Grab all questions
      const questionsPromise = Question.find();
      // Grab all users' answers
      const answersPromise = Answer.find({ session_id, });

      // Resolve promises and return to response
      return Promise.all([ questionsPromise, answersPromise, ]).then(results => {
        // Promise.all results return an array in the same order going in, [0] and [1] are acceptable to access
        res.json({
          questions: results[0],
          answers: results[1],
        });
      });
    })
    .catch(error => {
      res.status(400).json({ error, });
    });
}

// Export the start controller module
module.exports = {
  getStartCallback,
};
