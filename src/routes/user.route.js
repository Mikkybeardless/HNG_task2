import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.get("/:id", authMiddleware, userController.getUserById);

export default userRoute;
