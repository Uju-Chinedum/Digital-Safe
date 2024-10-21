import mongoose from "mongoose";

export const connectDB = (url: string) =>
  mongoose.set("debug", true).connect(url, {
    maxPoolSize: 500,
  });
