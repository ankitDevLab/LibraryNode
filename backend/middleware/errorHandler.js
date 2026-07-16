// Centralized error handler. Any error passed to next(err) (including
// errors thrown inside asyncHandler-wrapped routes) ends up here, so
// every route no longer needs to build its own error response.
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode =
    err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

// 404 handler for unmatched routes.
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = { errorHandler, notFound };
