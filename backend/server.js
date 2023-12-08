import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

//connect to MongoDb
connectDB();

//taking port value
const port = process.env.PORT || 5000;

const app = express();

//body parser middleware- getting data from body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

//route request
app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

//listening all routes
app.listen(port, () => console.log(`server running on port ${port}`));
