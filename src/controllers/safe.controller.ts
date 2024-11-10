import { Request, Response } from "express";
import { BadRequest, NotFound, Unauthenticated } from "../errors";
import { ISafe } from "../models";
import SafeModel from "../models/Safe";
import { StatusCodes } from "http-status-codes";

export const createSafe = async (req: Request, res: Response) => {
  if (!req.body)
    throw new BadRequest("Validation Error", "Please fill missing fields.");

  const safe: ISafe = await SafeModel.create(req.body);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      code: StatusCodes.CREATED,
      message: "Safe created successfully",
      safe,
    },
  });
};

export const getSafes = async (req: Request, res: Response) => {
  const safes = (await SafeModel.find({ user: req.user?.userId })) as ISafe[];

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      code: StatusCodes.CREATED,
      message: "Safe created successfully",
      safes,
      total: safes.length,
    },
  });
};

export const getSafe = async (req: Request, res: Response) => {
  const { id: safeId } = req.params;

  const safe = (await SafeModel.findOne({
    _id: safeId,
    user: req.user?.userId,
  })) as ISafe;
  if (!safe) {
    throw new NotFound("Safe Not Found", `No safe with id: ${safeId}`);
  }

  const password = req.query.password as string | undefined;
  if (!password) {
    throw new BadRequest(
      "Missing Field",
      `Please enter the password for ${safe.name}`,
    );
  }

  const isPassword = await safe.comparePassword(password);
  if (!isPassword) {
    throw new Unauthenticated("Validation Error", "Invalid Password");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      code: StatusCodes.OK,
      message: `Retrieved ${safe.name} successfully`,
      safe,
    },
  });
};

export const updateSafe = async (req: Request, res: Response) => {
  res.send("Update Safe");
};

export const updatePassword = async (req: Request, res: Response) => {
  res.send("Update Password");
};

export const deleteSafe = async (req: Request, res: Response) => {
  res.send("Delete Safe");
};
