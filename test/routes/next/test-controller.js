const sinon = require("sinon");
const expect = require("chai").expect;
const sinonMock = require("sinon-express-mock");

const nextController = require("../../../app/routes/next/controller");
const factory = require("../../factories");

// Models
const Answer = require("../../../app/models/Answer");
const Question = require("../../../app/models/Question");

describe("Next Controller", () => {
  beforeEach(() => {
    sinon.stub(Question, "find").resolves(factory.questions);
    sinon.stub(Answer, "find").resolves(factory.answers);
    sinon.stub(Answer.prototype, "save").resolves();
  });
  afterEach(() => {
    Question.find.restore();
    Answer.find.restore();
    Answer.prototype.save.restore();
  });

  it("should find the next available question", () => {
    return nextController
      .getNextQuestion(factory.questions, factory.questions[0]._id.toString())
      .then(result => {
        expect(result).to.equal(factory.questions[1]);
      });
  });

  it("should fail if no answer was given", () => {
    const request = factory.request.missingBody();
    const response = {
      status: function(responseStatus) {
        expect(responseStatus).to.equal(400);
        return this;
      },
      json: function(jsonResponse) {
        expect(jsonResponse.error).to.equal("No answer given");
        return this;
      },
    };
    const req = sinonMock.mockReq(request);
    const res = sinonMock.mockRes(response);
    return nextController.postNextCallback(req, res);
  });

  it("should fail if no question_id was given", () => {
    const request = factory.request.missingQuestionId();
    const response = {
      status: function(responseStatus) {
        expect(responseStatus).to.equal(400);
        return this;
      },
      json: function(jsonResponse) {
        expect(jsonResponse.error).to.equal("No question given");
        return this;
      },
    };
    const req = sinonMock.mockReq(request);
    const res = sinonMock.mockRes(response);
    return nextController.postNextCallback(req, res);
  });

  it("should return the next question and its answers", () => {
    const request = factory.request.validAnswer();

    // Node response
    const response = {
      json: function(jsonResponse) {
        expect(jsonResponse).to.have.property("question");
        expect(jsonResponse).to.have.property("answers");
        return this;
      },
    };

    // Mock the req and res
    const req = sinonMock.mockReq(request);
    const res = sinonMock.mockRes(response);

    // Call the function
    return nextController.postNextCallback(req, res);
  });
});
