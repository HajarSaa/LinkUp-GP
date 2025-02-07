import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`server running on port ${port} -> http://127.0.0.1:${port}`);
});
