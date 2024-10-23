import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import CustomError from "../errors";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let customError: CustomError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    name: "Internal Server Error",
    message: "Something went wrong!! Please try again.",
  };

  // Validation Error
  if (err.name === "ValidationError") {
    customError.name = "Validation Error";

    const validationErrors = err.errors as mongoose.Error.ValidationError; // Type assertion
    customError.message = Object.values(validationErrors)
      .map((item) => item.message)
      .join(", ");
      
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Duplicate Error
  if (err.code && err.code === 11000) {
    customError.name = "Duplicate Values";
    customError.message = `This ${Object.keys(
      err.keyValue,
    )} is already used by a user. Please use another ${Object.keys(
      err.keyValue,
    )}.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Type Error
  if (err.name === "CastError") {
    customError.name = "Not Found";
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  res.status(customError.statusCode).json({
    code: customError.statusCode,
    data: customError,
  });
};

export default errorHandler;
