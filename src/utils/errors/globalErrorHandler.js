function errorHandler(err, req, res, next) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      //     status: "failed",
      statusCode: err.statusCode,
      message: err.message,
      detail: err.errorDetail,
    });
  } else {
    console.error(`Error occurred: ${err.message}`);
    console.error(`Details: ${err.stack}`);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

module.exports = errorHandler;
