import db from "../models/index.js";
import { ErrorWithStatus } from "../exceptions/errorWithStatus.eception.js";

const Orgs = db.Orgs;
const UserOrganization = db.UserOrgs;

export const addUserToOrg = async (orgId, userId) => {
  try {
    // Checking if the organization exists
    const organization = await Orgs.findByPk(orgId);
    if (!organization) {
      throw new ErrorWithStatus("Organization not found", 404);
    }

    // Checking if the user is already a member of the organization
    const userOrg = await UserOrganization.findOne({
      where: { orgId, userId },
    });
    if (userOrg) {
      throw new ErrorWithStatus(
        "User already a member of this organization",
        400
      );
    }
    const org = await organization.addUser(userId);

    return org;
  } catch (error) {
    console.error("Error adding user organization:", error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const createNewOrg = async (name, description, userId) => {
  try {
    const newOrg = await Orgs.create({
      name,
      description,
    });
    newOrg.addUser(userId);

    return newOrg;
  } catch (error) {
    console.log("Error creating organisation", error);
    throw new ErrorWithStatus("Client error", 400);
  }
};

export const getOrgById = async (orgId) => {
  try {
    const org = await Orgs.findByPk(orgId);
    if (!org) {
      console.error("Organization with this id not found");
      throw new ErrorWithStatus("Organization not found", 404);
    }

    return org;
  } catch (error) {
    console.error("Error fetching organization by id:", error);
    throw new ErrorWithStatus(error.message, 500);
  }
};
