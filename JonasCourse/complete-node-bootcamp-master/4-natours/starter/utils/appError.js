class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // super() to access the message from Error (inheritance)
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // to determine operational errors

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
