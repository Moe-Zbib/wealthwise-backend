class AppError extends Error {
  constructor(message = "An error occurred", statusCode, errorDetail = {}) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetail = errorDetail;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest(errorDetail = {}, message = "Bad Request") {
    return new this(message, 400, errorDetail);
  }

  static Unauthorized(errorDetail = {}, message = "Unauthorized") {
    return new this(message, 401, errorDetail);
  }

  static Forbidden(errorDetail = {}, message = "Forbidden") {
    return new this(message, 403, errorDetail);
  }

  static NotFound(errorDetail = {}, message = "Resource not found") {
    return new this(message, 404, errorDetail);
  }

  static InternalServerError(
    errorDetail = {},
    message = "Internal Server Error"
  ) {
    return new this(message, 500, errorDetail);
  }
}

module.exports = AppError;
