const expect = require("chai").expect;

// Factories to test against
const factory = require('../factories');

// Model to test
const Answer = require("../../app/models/Answer");

describe("Answer Model", () => {
  it("should be invalid if text is empty", done => {
    const answer = new Answer();

    answer.validate(err => {
      expect(err.errors.text).to.exist;
      done();
    });
  });

  it("should be invalid if session_id is empty", done => {
    const answer = new Answer();

    answer.validate(err => {
      expect(err.errors.session_id).to.exist;
      done();
    });
  });

  it("should be invalid if question_id is empty", done => {
    const answer = new Answer();

    answer.validate(err => {
      expect(err.errors.question_id).to.exist;
      done();
    });
  });

  it("should validate a complete model", done => {
    const answer = new Answer();
    answer.session_id = factory.validAnswer.session_id;
    answer.question_id = factory.validAnswer.question_id;
    answer.text = factory.validAnswer.text;
    answer.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
