import dotenv from "dotenv";
import "express-async-errors";
import express, { json } from "express";
import morgan from "morgan";
import { connectMongo } from "./config";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import safeRouter from "./routes/safe.route";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errors";
import authenticateUser from "./middleware/authentication";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(helmet())
app.use(cors())

app.use(json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);
app.use("/api/v1/safe", authenticateUser, safeRouter);

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
