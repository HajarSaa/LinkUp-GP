import handleSocketError from "./handleSocketError.js";

export const socketAsync = (handler) => {
  return async (socket, ...args) => {
    try {
      await handler(socket, ...args);
    } catch (err) {
      // Find the callback if present (usually the last argument)
      const callback = args.find((arg) => typeof arg === "function");
      handleSocketError(socket, err, callback);
    }
  };
};
