import _ from "lodash";
import * as orgService from "../services/org.service.js";

// get all organizations associated to a logged in user
export const getAllUserOrgs = async (req, res) => {
  try {
    const userId = req.user.id; // get user id from query

    const user = await orgService.getAllUserOrgs(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let organizations = user.organizations;

    organizations = _.map(organizations, (item) =>
      _.pick(item, ["orgId", "name", "description"])
    );
    res.status(200).json({
      status: "Success",
      message: "User organisations for logged in user",
      data: { organisation: organizations },
    });
  } catch (error) {
    console.error("Error fetching user organizations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get organization by organization id
export const getUserOrgById = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    let organization = await orgService.getOrgById(orgId);

    if (organization)
      organization = _.pick(organization, ["name", "description", "orgId"]);

    res.status(200).json({
      message: "organisation by id",
      data: organization,
    });
  } catch (error) {
    console.error("Error fetching organization by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addUserToOrg = async (req, res) => {
  try {
    const organizationId = req.params.orgId;
    const userId = req.body.userId; // grab logged-in user's information from body

    const organization = await orgService.addUserToOrg(organizationId, userId);
    if (organization)
      res
        .status(200)
        .json({
          status: "success",
          message: "User added to organization successfully",
        });
  } catch (error) {
    console.error("Error adding user to organization:", error);
    res.status(400).json({ message: "Client error" });
  }
};

export const createNewOrg = async (req, res) => {
  try {
    let { name, description } = req.body;
    const id = req.user.id

    let organization = await orgService.createNewOrg(name, description, id);

    if (organization)
      organization = _.pick(organization, ["name", "description", "orgId"]);

    res.status(201).json({
      status: "Success",
      message: "Organization created successfully",
      data: organization,
    });
  } catch (error) {
    console.error("Error creating new organization:", error);
    res.status(400).json({ message: "Client error" });
  }
};
