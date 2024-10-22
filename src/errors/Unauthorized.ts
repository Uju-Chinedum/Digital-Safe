import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class Unauthorized extends CustomError {
  constructor(name: string, message: string) {
    super(message, StatusCodes.FORBIDDEN);

    this.name = name;
  }
}

export default Unauthorized;
