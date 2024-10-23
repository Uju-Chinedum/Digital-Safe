import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../models";
import { BadRequest } from "../errors";

export const register = async (req: Request, res: Response) => {
  if (!req.body)
    throw new BadRequest("Validation Error", "Please fill missing fields.");
  
  const user: IUser = await UserModel.create(req.body);

  res.status(StatusCodes.CREATED).json({
    code: StatusCodes.CREATED,
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  res.send("login");
};

export const logout = async (req: Request, res: Response) => {
  res.send("logout");
};
