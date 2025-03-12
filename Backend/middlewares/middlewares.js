import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";

const middlewares = (app) => {
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 100,
      message: "Too many requests from this IP, please try again in an hour!",
    })
  );

  // Body parser -> read data from body int req.body
  app.use(express.json({ limit: "100kb" }));
  // Logger
  app.use(morgan("dev"));
  // Data sanitization against XSS
  app.use(xss());
  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());
  // Prevent http param pollution
  app.use(hpp());
  // Set security headers
  app.use(helmet());
  // Enable CORS
  app.use(cors());
};

export default middlewares;
