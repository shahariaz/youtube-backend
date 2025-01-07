import { Router } from "express";
const router = Router();
import { registerUser } from "../controllers/user.controller.js";
router.get("/register", registerUser);

export default router;
