const expect = require("chai").expect;

// Factories to test against
const factory = require('../factories');

// Model to test
const Question = require("../../app/models/Question");

describe("Question Model", () => {
  it("should be invalid if text is empty", done => {
    const question = new Question();

    question.validate(err => {
      expect(err.errors.text).to.exist;
      done();
    });
  });

  it("should be invalid if order is empty", done => {
    const question = new Question();

    question.validate(err => {
      expect(err.errors.order).to.exist;
      done();
    });
  });

  it("should validate a complete model", done => {
    const question = new Question();
    question.text = factory.validQuestion.text;
    question.order = factory.validQuestion.order;
    question.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
