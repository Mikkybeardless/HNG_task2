import { Router } from "express";
import * as orgController from "../controllers/org.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { or } from "sequelize";

const orgRoute = Router();

export default orgRoute;

orgRoute.get("/organisations", authMiddleware, orgController.getAllUserOrgs);
orgRoute.get(
  "organisations/:orgId",
  authMiddleware,
  orgController.getUserOrgById
);
orgRoute.post(
  "organisations/:orgId/users",
  authMiddleware,
  orgController.addUserToOrg
);
orgRoute.post("/organisations", authMiddleware, orgController.createNewOrg);
