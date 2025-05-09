import AppError from "./appError.js";

export default function handleSocketError(socket, err, callback) {
  // Convert to AppError if not already one
  if (!(err instanceof AppError)) {
    err = new AppError(
      err.message || "Something went wrong",
      err.statusCode || 500
    );
  }

  // Detailed logging
  console.error(`${err.isOperational ? "AppError" : "SystemError"}:`, {
    statusCode: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  // Respond via callback if available, otherwise emit event
  if (typeof callback === "function") {
    callback({
      success: false,
      error: err.message,
      statusCode: err.statusCode,
    });
  } else {
    socket.emit("errorOccurred", {
      statusCode: err.statusCode,
      message: err.message,
    });
  }
}
