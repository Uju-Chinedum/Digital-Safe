import dotenv from "dotenv";
import "express-async-errors";
import express, { json } from "express";
import morgan from "morgan";
import { connectDB } from "./db/connect";
import authRouter from "./routes/auth.route";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

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

start();
