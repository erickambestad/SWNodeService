var Promise = require("bluebird");

/**
 * Takes in express request object and returns Promise eith resolved with user's session or rejected
 *
 * @param {Object} req
 */
function checkSession(req) {
  return new Promise((resolve, reject) => {
    if (
      (req.headers && req.headers["sw-session-id"]) ||
      req.get("sw-session-id")
    ) {
      resolve(req.headers["sw-session-id"] || req.get("sw-session-id"));
    } else {
      reject("no session.");
    }
  });
}

// Export the helpers module
module.exports = {
  checkSession,
};
