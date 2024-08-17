import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import BlogRouter from "./routes/BlogRoutes.js";
import userRouter from "./routes/UserRoutes.js";
mongoose
  .connect(process.env.MONGODBCONNECTION)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.use("/api/v1/blog", BlogRouter);
app.use("/api/v1/user", userRouter);

app.listen(7000, () => {
  console.log("Server started on port 7000");
});
