import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class BadRequest extends CustomError {
  constructor(name: string, message: string | string[]) {
    super(
      Array.isArray(message) ? message.join(", ") : message,
      StatusCodes.BAD_REQUEST,
    );

    this.name = name;
  }
}

export default BadRequest;
