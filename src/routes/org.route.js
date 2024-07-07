import { Router } from "express";
import * as orgController from "../controllers/org.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateMiddleware } from "../middlewares/route.middleware.js";
import {
  orgSchema,
  addMemberToOrgSchema,
} from "../validation/org.validation.js";

const orgRoute = Router();

orgRoute.use(authMiddleware); // Protect all routes in this file
orgRoute.get("/organisations", orgController.getAllUserOrgs);
orgRoute.get("/organisations/:orgId", orgController.getUserOrgById);

// middleware to validate request body
orgRoute.post(
  "/organisations/:orgId/users",
  generateMiddleware(addMemberToOrgSchema, "InvalidId"),
  orgController.addUserToOrg
);
orgRoute.post(
  "/organisations",
  generateMiddleware(orgSchema, "Invalid organisation details"),
  orgController.createNewOrg
);
export default orgRoute;
