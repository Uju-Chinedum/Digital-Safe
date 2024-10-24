import jwt from "jsonwebtoken";
import { TokenPayload } from "./types";

export const createJWT = (payload: TokenPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

export const verifyToken = (token: string): TokenPayload =>
  jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
