import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class BadRequest extends CustomError {
  constructor(name: string, message: string) {
    super(message, StatusCodes.BAD_REQUEST);

    this.name = name;
  }
}

export default BadRequest;
