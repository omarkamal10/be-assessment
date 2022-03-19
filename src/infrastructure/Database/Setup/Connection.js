import Sequelize from "sequelize";
import Config from "../../../../config";

const { host, port, databaseName, username, password, pool } = Config.Database;

export default new Sequelize(databaseName, username, password, {
  host,
  port,
  pool,
  dialect: "postgres",

  logging:
    process.env.NODE_ENV === "Reset" ||
    process.env.NODE_ENV === "Initialization",
});
