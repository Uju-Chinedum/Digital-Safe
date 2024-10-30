import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";

export const getMe = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ _id: req.user?.userId });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      message: "Gotten Current User",
      user,
    },
  });
};

export const updateMe = async (req: Request, res: Response) => {
  res.send("Update Me");
};

export const updatePassword = async (req: Request, res: Response) => {
  res.send("Update Password");
};

export const deleteMe = async (req: Request, res: Response) => {
  res.send("Delete Me");
};
