import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { generateMiddleware } from "../middlewares/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import asyncMiddleware from "../middlewares/async.middleware.js";

const authRoute = Router();

authRoute.post(
  "/login",
  generateMiddleware(
    loginSchema,
    "Authentication failed due to invalid credentials"
  ),
  asyncMiddleware(authController.login)
);
authRoute.post(
  "/register",
  generateMiddleware(registerSchema, "Registration unsuccesful"),
  asyncMiddleware(authController.register)
);

export default authRoute;
