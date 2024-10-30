import mongoose from "mongoose";

const connectMongo = (url: string) =>
  mongoose.set("debug", true).connect(url, {
    maxPoolSize: 500,
  });

export default connectMongo;
