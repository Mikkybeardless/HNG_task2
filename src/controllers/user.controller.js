export const getUser = async (req, res) => {
  //   / get user by id
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    if (user)
      res.status(200).json({
        status: "success",
        message: "User by id",
        data: user,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
