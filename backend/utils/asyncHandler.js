// Wraps an async route handler and forwards any thrown/rejected error
// to Express's error-handling middleware, instead of every route
// needing its own try/catch block.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
