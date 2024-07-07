import { v4 as uuidv4 } from "uuid";

export const UserModel = (sequelize, DataTypes) => {
  const userOrganizations = sequelize.define(
    "UserOrganizations",
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      organizationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
    },
    {
      tableName: "user_organizations",
    }
  );

  return userOrganizations;
};

export default UserModel;
