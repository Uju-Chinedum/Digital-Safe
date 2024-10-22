import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class Unauthenticated extends CustomError {
  constructor(name: string, message: string) {
    super(message, StatusCodes.UNAUTHORIZED);

    this.name = name;
  }
}

export default Unauthenticated;
