import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import {
  isMongoCastError,
  isMongoDuplicateKeyError,
  isMongooseError,
} from "../utils";
import mongoose, { Error as MongooseError } from "mongoose";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let customError: CustomError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    name: "Internal Server Error",
    message: "Something went wrong!! Please try again.",
  };

  // Handle Mongoose validation errors
  if (isMongooseError(err)) {
    if (err instanceof mongoose.Error.ValidationError) {
      customError.name = "Validation Error";
      customError.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(", ");
      customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // Handle duplicate key errors
    else if (isMongoDuplicateKeyError(err)) {
      customError.name = "Duplicate Values";
      customError.message = `This ${Object.keys(err.keyValue).join(", ")} is already used by a user. Please use another ${Object.keys(err.keyValue).join(", ")}.`;
      customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // Handle cast errors
    else if (isMongoCastError(err)) {
      customError.name = "Not Found";
      customError.message = `No item found with id: ${err.value}`;
      customError.statusCode = StatusCodes.NOT_FOUND;
    }
  }

  // If err is a generic error
  else if (err instanceof Error) {
    customError.name = err.name || "Internal Server Error";
    customError.message =
      err.message || "Something went wrong!! Please try again.";
  }

  // Send the response
  res
    .status(customError.statusCode)
    .json({ code: customError.statusCode, data: customError });
};

export default errorHandler;
