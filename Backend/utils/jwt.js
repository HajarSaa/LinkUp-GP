import jwt from "jsonwebtoken";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createSendTokenCookie = (user, statusCode, res) => {
  // Create a JWT
  const token = signToken(user._id);

  // Send the JWT as a cookie
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production", // cookie will only be sent on an encrypted connection (https) in production
    httpOnly: true, // cookie cannot be accessed or modified in any way by the browser
  });

  // Remove the password from the output
  user.password = undefined;
  // the reason the password is not removed although we set it visible to false in the schema is because the schema is not run when we create a new user
  // the schema is only run when we fetch a user from the database

  // send the response with the token
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
