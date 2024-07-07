import { v4 as uuidv4 } from "uuid";

const UserModel = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
    }
  );
  user.associate = (models) => {
    user.belongsToMany(models.Organization, {
      through: "UserOrganizations",
      as: "organizations",
      foreignKey: "userId",
    });
  };

  return user;
};

export default UserModel;
