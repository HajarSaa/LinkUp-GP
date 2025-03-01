// Class to handle errors in the application

class AppError extends Error {
  // constructor takees two arguments message and statusCode
  // - message: Description of what went wrong
  // - statusCode: HTTP status code to be sent in the response
    constructor(message, statusCode) {
      // call the parent class constructor with the message argument
      super(message);
  
      // store the http sataus code in the object 
      this.statusCode = statusCode ;

      // determine error status based on the status code
      // 4xx codes are for client errors
      // 5xx codes are for server errors 
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

      // Mark all AppError objects as operational errors 
      // Destinguish between operational errors and programming errors
      this.isOperational = true;
  
      // Capture the stack trace for the error object
      // stack trace -> is a snapshot of the call stack at the time of the error
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export default AppError;
      