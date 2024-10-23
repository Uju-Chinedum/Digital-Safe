import { model, Schema } from "mongoose";
import { IUser } from ".";
import { isEmail } from "validator";
import { compare, genSalt, hash } from "bcryptjs";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: (value: string) => isEmail(value),
        message: "Please provide a valid email.",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await genSalt(4);
  this.password = await hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  const isMatch = await compare(candidate, this.password);
  return isMatch;
};

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
