import { DatabaseConnection } from "./src/infrastructure/Database";
import Server from "./src/interfaces/http/server";
import Config from "./config";

const { databaseName } = Config.Database;

export default () => {
  DatabaseConnection.authenticate()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log(`Successfully connected to ${databaseName} database`.success);

      new Server(Config.Port).start();
    })
    .catch((error) => console.error(`${error.message}`.error));
};
