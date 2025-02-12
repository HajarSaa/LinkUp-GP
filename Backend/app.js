import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();

// body parser -> read data from body int req.body
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.all("*", (req, res) => {
  res.send("ERORR: 404 NOT FOUND");
});

export default app;
