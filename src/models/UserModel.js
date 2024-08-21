import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://api.adorable.io/avatars/285/user@adorable.png",
    },
    coverImage: {
      imageId: {
        type: String,
        required: true,
      },
      secureUrl: {
        type: String,
        required: true,
      },
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 128,
      select: false,
    },
    refreshToken: {
      type: String,
      required: true,
      default: null,
    },
    watchHistory: {
      type: [Schema.Types.ObjectId],
      ref: "Video",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password23) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateJwtToken = async function () {
  jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};
export const User = model("User", userSchema);
