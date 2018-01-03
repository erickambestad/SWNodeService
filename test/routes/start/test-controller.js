const sinon = require("sinon");
const expect = require("chai").expect;
const sinonMock = require("sinon-express-mock");

const startController = require("../../../app/routes/start/controller");
const factory = require("../../factories");

// Models
const Answer = require("../../../app/models/Answer");
const Question = require("../../../app/models/Question");

describe("Start Controller", () => {
  beforeEach(() => {
    sinon.stub(Question, "find").resolves(factory.questions);
    sinon.stub(Answer, "find").resolves(factory.answers);
  });
  afterEach(() => {
    Question.find.restore();
    Answer.find.restore();
  });
  it("should return all questions and answers", () => {
    // Node request with user session
    const request = factory.request.validSession();

    // Node response
    const response = {
      json: function(jsonResponse) {
        expect(jsonResponse.questions).to.equal(factory.questions);
        expect(jsonResponse.answers).to.equal(factory.answers);
        return this;
      },
    };

    // Mock the req and res
    const req = sinonMock.mockReq(request);
    const res = sinonMock.mockRes(response);

    // Call the function
    startController.getStartCallback(req, res);
  });
});
