import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello backend user");
});

// app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`server running on port ${port}`));
