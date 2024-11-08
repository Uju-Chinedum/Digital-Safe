import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ISafe extends Document {
  _id: string;
  name: string;
  password: string;
  contents: Types.ObjectId[];
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IContent extends Document {
  _id: string;
  type: "image" | "video" | "file";
  url: string;
  filename: string;
  size?: number;
  safe: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}