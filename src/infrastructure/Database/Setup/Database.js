import Sequelize from "sequelize";
import * as Models from "../models";
import connection from "./Connection";
import relationships from "./Relationships";

const Users = Models.Users(connection, Sequelize.DataTypes);
const Tokens = Models.Tokens(connection, Sequelize.DataTypes);
const UserURLChecks = Models.UserURLChecks(connection, Sequelize.DataTypes);
const URLs = Models.URLs(connection, Sequelize.DataTypes);
const Database = {
  connection,

  Users,

  Tokens,

  UserURLChecks,

  URLs,
};

relationships(Database);

export default Database;
