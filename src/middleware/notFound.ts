import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    code: StatusCodes.NOT_FOUND,
    data: {
      name: "Page Not Found",
      message: "Page does not exist. Please recheck URL",
    },
  });
};

export default notFound;
