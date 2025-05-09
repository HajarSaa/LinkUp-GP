import AppError from "./appError.js";

// Handels Mongoose CastErrors
const handleCastErrorDB = (err) => {
  const message = `Invalid${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Handels MongoDB's Dublicate Field Errors
const handleDublicateFieldDB = (err) => {
  // Extract the duplicate value from the error message using regex
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Dublicate field value:${value}. please use another value!`;
  return new AppError(message, 400);
};

// Handels Mongoose Validation Errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// Handels JWT Errors
const handleJWTError = () => {
  return new AppError("Invalid token, please log in again", 401);
};

// Handels JWT Expired Errors
const handleJWTExpiresError = () => {
  return new AppError("Your token has expired, please log in again", 401);
};

// Detailed error responses for development environment
const sendErrorDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Client friendly error responses for production environment
const sendErrorProduction = (err, res) => {
  // Operational, Known errors (errors we expect and handle)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Unoperational, Unknown errors (errors we don't expect and send a generic message)
  } else {
    console.error("ERROR:😭", err);
    res.status(err.statusCode).json({
      status: "error",
      message: "Something went wrong ",
    });
  }
};

// ================ GLOBAL ERROR HANDLER MIDDLEWARE ================
// Express error handling middleware
// This middleware will catch all errors in the application and send a response to the client

export const globalErrorHandeler = (err, req, res, next) => {
  // Set default status code and status if not provided
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // development vs production
  if (process.env.NODE_ENV == "development") {
    // Send detailed error response for development environment
    sendErrorDevelopment(err, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = Object.create(err);
    // NOTE: let error = { ...err }; --> won't work , because name is Non-enumerable property
    // Non-enumerable properties are not copied by spread operator

    // Transforming different types of errors into a consistent format for production environment
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDublicateFieldDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiresError();

    // Send client friendly error response for production environment
    sendErrorProduction(error, res);
  }
};
