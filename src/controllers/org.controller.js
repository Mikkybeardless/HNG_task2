import db from "../models/index.js";

import * as orgService from "../services/org.service.js";

// database model import
const Users = db.Users;
const Orgs = db.Orgs;

// get all organizations associated to a logged in user
export const getAllUserOrgs = async (req, res) => {
  try {
    const userId = req.user.id; // get user id from query

    const user = await Users.findByPk(userId, {
      include: {
        model: db.Orgs,
        as: "organizations",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User organisations",
      data: user.organisations,
    });
  } catch (error) {
    console.error("Error fetching user organizations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get organization by organization id
export const getUserOrgById = async (req, res) => {
  const orgId = req.params.id;

  const organization = await orgService.getOrgById(orgId);
  if (organization)
    res.status(200).json({
      message: "organisation by id",
      data: organization,
    });
};

export const addUserToOrg = async (req, res) => {
  const organizationId = req.params.id;
  const userId = req.body; // grab logged-in user's information from body

  const organization = await orgService.addUserToOrg(organizationId, userId);
  if (organization)
    res
      .status(200)
      .json({ message: "User added to organization successfully" });
};

export const createNewOrg = async (req, res) => {
  const { name, description } = req.body;

  const organization = await orgService.createNewOrg(name, description);
  if (organization)
    res.status(201).json({ message: "Organization created successfully" });
};
