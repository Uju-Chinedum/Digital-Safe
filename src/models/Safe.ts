import { model, Schema } from "mongoose";
import { ISafe } from ".";
import { compare, genSalt, hash } from "bcryptjs";
import { safeRegex } from "../utils";

const SafeSchema = new Schema<ISafe>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      match:
        safeRegex
    },
    contents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // Automatically remove password when converting to JSON
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

SafeSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await genSalt(4);
  this.password = await hash(this.password, salt);
});

SafeSchema.methods.comparePassword = async function (candidate: string) {
  const isMatch = await compare(candidate, this.password);
  return isMatch;
};

const SafeModel = model<ISafe>("Safe", SafeSchema);

export default SafeModel;
