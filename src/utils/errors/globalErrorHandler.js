function errorHandler(err, req, res, next) {
  // If the error is an instance of AppError, it is an operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      //     status: "failed",
      statusCode: err.statusCode,
      message: err.message,
      detail: err.errorDetail,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

module.exports = errorHandler;
