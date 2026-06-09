import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { upload } from "../middleware/multer.js";
import {signup, login, logout  } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", upload.single("profileImage"), signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", verifyUser, logout);

export { authRoutes };