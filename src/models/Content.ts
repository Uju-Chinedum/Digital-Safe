import { model, Schema, Types } from "mongoose";
import { IContent } from ".";

const ContentSchema = new Schema<IContent>(
  {
    type: {
      type: String,
      enum: ["image", "video", "file"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    filename: { type: String, required: true },
    size: Number,
    safe: {
      type: Schema.Types.ObjectId,
      ref: "Safe",
      required: true,
    },
  },
  { timestamps: true },
);

const ContentModel = model<IContent>("Content", ContentSchema);

export default ContentModel;
