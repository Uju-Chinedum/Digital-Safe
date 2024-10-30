import dotenv from "dotenv";
import "express-async-errors";
import express, { json } from "express";
import morgan from "morgan";
import { connectMongo } from "./config";
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
    await connectMongo(process.env.MONGO_URI!);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
