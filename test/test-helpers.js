var expect = require("chai").expect;
var mockReq = require("sinon-express-mock").mockReq;

const factory = require("./factories");
var checkSession = require("../app/routes/helpers").checkSession;

describe("Route helpers", () => {
  it("should find the user's session ID", () => {
    const request = {
      headers: {
        ["sw-session-id"]: factory.sessionId,
      },
    };
    const req = mockReq(request);
    return checkSession(req).then(result => {
      return expect(result).to.equal(factory.sessionId);
    });
  });
});
