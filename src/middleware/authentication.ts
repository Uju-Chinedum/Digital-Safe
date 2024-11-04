import { NextFunction, Request, Response } from "express";
import { Unauthenticated } from "../errors";
import { verifyToken } from "../utils";
import { redisClient } from "../config";

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Unauthorized", "Not authenticated");
  }

  const token = authHeader.split(" ")[1];
  const isBlacklisted = await redisClient.get(token);
  if (isBlacklisted) {
    throw new Unauthenticated(
      "Unauthorized",
      "Token has been revoked. Please login again.",
    );
  }

  try {
    const { userId, email, exp } = verifyToken(token);
    req.user = { userId, email };

    if (req.url === "/logout" || req.url === "/delete-me") {
      req.user.exp = exp;
      req.user.token = token;
    }
    next();
  } catch (error) {
    throw new Unauthenticated("Unauthorized", "Not authenticated");
  }
};

export default authenticateUser;
