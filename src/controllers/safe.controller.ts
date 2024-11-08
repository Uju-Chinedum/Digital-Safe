import { Request, Response } from "express";

export const createSafe = async (req: Request, res: Response) => {
  res.send("Create Safe");
};

export const getSafes = async (req: Request, res: Response) => {
  res.send("Get Safes");
};

export const getSafe = async (req: Request, res: Response) => {
  res.send("Get Safe");
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
