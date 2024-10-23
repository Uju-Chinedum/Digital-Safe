import joi from "joi";
import { BadRequest } from "../errors";
import { NextFunction, Request, Response } from "express";

// Regex for password validation: at least 1 uppercase, 1 lowercase, 1 digit, 1 special char, and minimum 8 characters
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userValidationSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name should not be empty.",
  }),
  email: joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email should not be empty.",
    "string.email": "Email should be a valid email address.",
  }),
  password: joi.string().pattern(passwordRegex).required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password should not be empty.",
    "string.pattern.base":
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
  }),
});

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return next(new BadRequest("Validation Error", errorDetails));
  }

  next();
};

export default validateUser;
