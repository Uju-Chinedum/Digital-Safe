import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class NotFound extends CustomError {
  constructor(name: string, message: string) {
    super(message, StatusCodes.NOT_FOUND);

    this.name = name;
  }
}

export default NotFound;
