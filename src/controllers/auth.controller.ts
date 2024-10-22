import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  res.send("register");
};

export const login = async (req: Request, res: Response) => {
  res.send("login");
};

export const logout = async (req: Request, res: Response) => {
  res.send("logout");
};

