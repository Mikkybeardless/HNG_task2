import * as authService from "../services/auth.service.js";

import { createNewOrg } from "../services/org.service.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    const newUser = await authService.register(
      firstName,
      lastName,
      email,
      password,
      phone
    );

    const { token, user } = await authService.login(email, password);

    const name = `${firstName}'s Organisation`;
    const userId = user.userId;

    console.log(userId);

    // create defaul  t organisation on registration
    await createNewOrg(name, "Default organisation", userId);

    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201);
    res.json({
      status: "success",
      message: "Registration successfully",
      data: {
        user: newUser,
        accessToken: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Bad request",
      message: "Registration unsuccessful",
      statusCode: 400,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        accessToken: token,
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "Bad request",
      message: "Authentication failed",
      statusCode: 401,
    });
  }
};
