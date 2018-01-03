const sinon = require("sinon");
const expect = require("chai").expect;
const sinonMock = require("sinon-express-mock");
const Promise = require("bluebird");

const summaryController = require("../../../app/routes/summary/controller");
const factory = require("../../factories");

// Models
const Answer = require("../../../app/models/Answer");
const Question = require("../../../app/models/Question");

describe("Start Controller", () => {
  beforeEach(() => {
    sinon.stub(Question, "find").resolves(factory.questions);
    sinon.stub(Answer, "find").resolves(factory.answers);
    sinon.stub(Promise, "all").resolves([ factory.questions, factory.answers, ]);
  });
  afterEach(() => {
    Question.find.restore();
    Answer.find.restore();
    Promise.all.restore();
  });

  it("should return a summary of all questions and answers", () => {
    // Node request with user session
    const request = factory.request.validSession();

    // Node response
    const response = {
      json: function(jsonResponse) {
        expect(jsonResponse.length).to.equal(3);
        return this;
      },
    };

    // Mock the req and res
    const req = sinonMock.mockReq(request);
    const res = sinonMock.mockRes(response);

    // Call the function
    return summaryController.getSummaryCallback(req, res);
  });
});
