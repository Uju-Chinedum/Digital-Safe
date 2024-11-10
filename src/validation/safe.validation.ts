import joi from "joi";
import { BadRequest } from "../errors";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { safeRegex } from "../utils";

const isValidObjectId = (value: string, helpers: any) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("User must be a valid MongoDB ObjectId.");
  }
  return value;
};

const safeValidationSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name should not be empty.",
  }),
  password: joi.string().pattern(safeRegex).required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password should not be empty.",
    "string.pattern.base":
      "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
  user: joi.string().custom(isValidObjectId).required().messages({
    "any.required": "User is required.",
    "string.empty": "User should not be empty.",
  }),
  contents: joi
    .array()
    .items(joi.string().valid("image", "video", "file"))
    .optional()
    .messages({
      "array.includes":
        "Contents must be an array of type 'image', 'video', or 'file'.",
    }),
});

const validateSafe = (req: Request, res: Response, next: NextFunction) => {
  req.body.user = req.user?.userId;

  const { error } = safeValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return next(new BadRequest("Validation Error", errorDetails));
  }

  next();
};

export default validateSafe;
