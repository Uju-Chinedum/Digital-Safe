import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";
import { EditUserDto } from "../dto/editUser.dto";
import { BadRequest, NotFound } from "../errors";

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
  if (!req.body) {
    throw new BadRequest("Missing Details", "Please provide fields for update");
  }
  const updateBody: EditUserDto = req.body;

  const user = await UserModel.findByIdAndUpdate(req.user?.userId, updateBody, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      message: "User updated successfully",
      user,
    },
  });
};

export const updatePassword = async (req: Request, res: Response) => {
  res.send("Update Password");
};

export const deleteMe = async (req: Request, res: Response) => {
  res.send("Delete Me");
};
