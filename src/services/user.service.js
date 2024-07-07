import db from "../models/index.js";
import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";
import _ from "lodash";

const Users = db.Users;
export const getUserById = async (userId) => {
  try {
    let user = await Users.findByPk(userId);
    if (!user) {
      console.error("User with this id not found");
      throw new ErrorWithStatus("user not found", 404);
    }

    user = _.pick(user, ["firstName", "lastName", "email", "phone", "userId"]);
    return user;
  } catch (error) {
    console.error("Error fetching user useranizations:", error);
    throw new ErrorWithStatus("useranization not found", 404);
  }
};
