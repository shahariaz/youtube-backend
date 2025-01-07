import { catchAsync } from "../utils/catchAsync.js";

export const registerUser = catchAsync(async (req, res) => {
  res.status(201).json({
    message: "User registered successfully",
  });
});
