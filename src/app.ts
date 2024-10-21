import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import { connectDB } from "./db/connect";

dotenv.config();

const app = express();
const PORT = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
