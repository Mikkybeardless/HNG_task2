import Joi from "joi";

export const orgSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

export const addMemberToOrgSchema = Joi.object({
  userId: Joi.string().required(),
});
