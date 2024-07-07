import { v4 as uuidv4 } from "uuid";

const OrgModel = (sequelize, DataTypes) => {
  const organization = sequelize.define(
    "Organisation",
    {
      orgId: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "organisations",
    }
  );
  organization.associate = (models) => {
    organization.belongsToMany(models.User, {
      through: "UserOrganizations",
      as: "users",
      foreignKey: "orgId",
    });
  };

  return organization;
};

export default OrgModel;
