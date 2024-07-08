import * as userService from "../services/user.service.js";

export const getUserById = async (req, res) => {
  //   / get user by id
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await userService.getUserById(userId);

    res.status(200).json({
      status: "success",
      message: "User by id",
      data: user,
    });

    res.json(userId);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};
