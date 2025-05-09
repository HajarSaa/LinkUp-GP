export const simulateUserIfMissing = (req, res, next) => {
  if (!req.user && req.body.userId) {
    req.user = { id: req.body.userId };
  }
  next();
};
