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

orgRoute.get("/", orgController.getAllUserOrgs);
orgRoute.get("/:orgId", orgController.getUserOrgById);

// middleware to validate request body
orgRoute.post(
  "/:orgId/users",
  generateMiddleware(addMemberToOrgSchema, "Invalid Id"),
  orgController.addUserToOrg
);
orgRoute.post(
  "/",
  generateMiddleware(orgSchema, "Invalid organisation details"),
  orgController.createNewOrg
);
export default orgRoute;
