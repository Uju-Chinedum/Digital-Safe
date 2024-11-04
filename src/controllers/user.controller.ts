import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";
import { EditPasswordDto, EditUserDto } from "../dto";
import { BadRequest, NotFound, Unauthenticated } from "../errors";
import { IUser } from "../models";
import { blacklistToken } from "../utils";

export const getMe = async (req: Request, res: Response) => {
  const user = (await UserModel.findOne({ _id: req.user?.userId })) as IUser;
  if (!user) {
    throw new NotFound("Missing User", "This user does not exist");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      code: StatusCodes.OK,
      message: "Gotten Current User",
      user,
    },
  });
};

export const updateMe = async (
  req: Request<{}, {}, EditUserDto>,
  res: Response,
) => {
  if (!req.body) {
    throw new BadRequest("Missing Details", "Please provide fields for update");
  }

  const updateBody: EditUserDto = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = (await UserModel.findByIdAndUpdate(
    req.user?.userId,
    updateBody,
    {
      new: true,
      runValidators: true,
    },
  )) as IUser;
  if (!user) {
    throw new NotFound("Missing User", "This user does not exist");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      code: StatusCodes.OK,
      message: "User updated successfully",
      user,
    },
  });
};

export const updatePassword = async (
  req: Request<{}, {}, EditPasswordDto>,
  res: Response,
) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequest("Missing Details", "Please fill all fields");
  }

  const user = (await UserModel.findOne({ _id: req.user?.userId })) as IUser;
  if (!user) {
    throw new NotFound("Missing User", "This user does not exist");
  }

  const checkPassword = await user.comparePassword(oldPassword);
  if (!checkPassword) {
    throw new Unauthenticated("Validation Error", "Invalid Credentials");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      code: StatusCodes.OK,
      message: "User deleted successfully",
      user,
    },
  });
};

export const deleteMe = async (req: Request, res: Response) => {
  const token = req.user?.token!;
  const exp = req.user?.exp!;

  const user = (await UserModel.findByIdAndDelete(req.user?.userId)) as IUser;
  if (!user) {
    throw new NotFound("Missing User", "This user does not exist");
  }

  await user?.deleteOne();
  await blacklistToken(token, exp);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      code: StatusCodes.OK,
      message: "User deleted successfully",
    },
  });
};
