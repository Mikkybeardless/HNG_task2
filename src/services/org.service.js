import db from "../models/index.js";
import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";

const Orgs = db.Orgs;
const UserOrganization = db.UserOrgs;

export const addUserToOrg = async (orgId, userId) => {
  try {
    // Check if the organization exists
    const organization = await Orgs.findByPk(orgId);
    if (!organization) {
      throw new ErrorWithStatus("Organization not found", 404);
    }

    // Check if the user is already a member of the organization
    const existingMembership = await models.UserOrganization.findOne({
      where: {
        userId,
        orgId,
      },
    });

    if (existingMembership) {
      throw new ErrorWithStatus("user exist in organization", 404);
    }

    // Add a new membership (row in UserOrganization)
    const org = await UserOrganization.create({
      userId,
      orgId,
    });

    return org;
  } catch (error) {
    console.error("Error adding user organization:", error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const createNewOrg = async (name, desc) => {
  try {
    const newOrg = await Orgs.create({
      name,
      desc,
    });

    return newOrg;
  } catch (error) {
    console.log("Error creating organisation", error);
    throw new ErrorWithStatus("Client error", 400);
  }
};

export const getOrgById = async (orgId) => {
  try {
    const org = await Orgs.findById(orgId);
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
