import { NextFunction, Request, Response } from "express";
import { Unauthenticated } from "../errors";
import { verifyToken } from "../utils";

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Unauthorized", "Not authenticated");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId, email } = verifyToken(token);
    req.user = { userId, email };
    next();
  } catch (error) {
    throw new Unauthenticated("Unauthorized", "Not authenticated");
  }
};

export default authenticateUser;
