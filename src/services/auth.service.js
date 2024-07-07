import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ErrorWithStatus } from "../exceptions/errorWithStatus.eception.js";
import dotenv from "dotenv";
import _ from "lodash";
// internal modules
import db from "../models/index.js";

dotenv.config();
const User = db.Users;

export const login = async (email, password) => {
  // check if email exist
  let user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new ErrorWithStatus("User not found", 404);
  }

  // check if password is incorrect
  if (!bcrypt.compareSync(password, user.password)) {
    throw new ErrorWithStatus("Authentication failed", 401);
  }

  const { firstName, userId } = user;

  // generate access tokren
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      firstName: firstName,
      email: user.email,
      id: userId,
      sub: user.userId,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // remove password from user object
  user = _.pick(user, ["firstName", "lastName", "email", "phone", "userId"]);

  return { token, user };
};

export const register = async (firstName, lastName, email, password, phone) => {
  const existingUser = await User.findOne({ where: { email: email } });

  //  check if email exists
  if (existingUser) {
    throw new ErrorWithStatus("User with this email already Exist", 400);
  }

  password = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    phone,
  });

  let user = await newUser.save();
  // remove password from user object
  user = _.pick(user, ["firstName", "lastName", "email", "phone", "userId"]);

  return user;
};
