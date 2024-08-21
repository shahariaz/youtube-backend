import mongoose, { Schema, model } from "mongoose";
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

export const User = model("User", userSchema);
