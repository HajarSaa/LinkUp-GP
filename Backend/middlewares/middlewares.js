import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

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
  // Enable CORS for all requests
  app.use(
    cors({
      origin: function (origin, callback) {
        const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://127.0.0.1:5173",
          // the frontend URL for production(if any)
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  ); // Cookie parser -> read data from cookies
  app.use(cookieParser());
};

export default middlewares;
