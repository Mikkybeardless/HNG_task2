import { Sequelize, DataTypes } from "sequelize";
import CONFIG from "../config/db.config.js";
import OrgModel from "./org.model.js";
import UserModel from "./user.model.js";
import UserOrgModel from "./userOrg.model.js";

const sequelize = new Sequelize(
  CONFIG.DB_NAME,
  CONFIG.DB_USER,
  CONFIG.DB_PASSWORD,
  {
    host: CONFIG.DB_HOST,
    dialect: CONFIG.DB_DIALECT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

const User = UserModel(sequelize, DataTypes);
const Organization = OrgModel(sequelize, DataTypes);
const UserOrganization = UserOrgModel(sequelize, DataTypes);

//  associations
User.belongsToMany(Organization, {
  through: UserOrganization,
  foreignKey: "userId",
  otherKey: "orgId",
  as: "organizations",
});

Organization.belongsToMany(User, {
  through: UserOrganization,
  foreignKey: "orgId",
  otherKey: "userId",
  as: "users",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// add models
db.Users = User;
db.Orgs = Organization;
db.UserOrgs = UserOrganization;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables sync successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
