import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../models";
import { BadRequest, Unauthenticated } from "../errors";
import { createJWT } from "../utils";
import { TokenPayload } from "../utils/types";
import { redisClient } from "../config";

export const register = async (req: Request, res: Response) => {
  if (!req.body)
    throw new BadRequest("Validation Error", "Please fill missing fields.");

  const user: IUser = await UserModel.create(req.body);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      code: StatusCodes.CREATED,
      message: "User created successfully",
      user,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Missing Details", "Please provide all details");
  }

  const user = (await UserModel.findOne({ email })) as IUser;
  if (!user) {
    throw new Unauthenticated("Validation Error", "Invalid Credentials");
  }

  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    throw new Unauthenticated("Validation Error", "Invalid Credentials");
  }

  const payload: TokenPayload = { userId: user._id, email };
  const token = createJWT(payload);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      code: StatusCodes.OK,
      message: "User logged in successfully",
      user,
      token,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.user?.token;
  if (!token) {
    throw new Unauthenticated("Unauthorized", "No token provided");
  }

  const expirationTime = req.user?.exp
    ? req.user.exp - Math.floor(Date.now() / 1000)
    : 0;

  // Check if expirationTime is a positive number, otherwise set a default
  const ttl = expirationTime > 0 ? expirationTime : 3600; // 1 hour fallback if no valid expiration time

  await redisClient.set(token, "blacklisted", {
    EX: ttl,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { code: StatusCodes.OK, message: "User logged out successfully" },
  });
};
