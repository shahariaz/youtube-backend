import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routers/user.routes.js";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/", userRoute);
export default app;
