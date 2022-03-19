import Database from "../src/infrastructure/database";
import "../TerminalColors";

/* eslint-disable no-console */

Database.connection
  .sync({
    force:
      process.env.NODE_ENV === "Reset" || process.env.NODE_ENV === "Docker",
    alter: false,
  })
  .then(async () => {
    console.log("Database Initialized");
  })
  .catch((err) => ErrorHandler(err))
  .finally(() => Database.connection.close());
