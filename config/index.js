import Dotenv from "dotenv";

Dotenv.config();

export default Object.freeze({
  Port: process.env.PORT * 1,

  Database: {
    host:
      process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_DATABASE_HOST
        : process.env.DATABASE_HOST,
    port:
      (process.env.NODE_ENV === "Docker"
        ? process.env.DOCKER_DATABASE_PORT
        : process.env.DATABASE_PORT) * 1,
    databaseName: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },

  JwtSecret: process.env.JWT_SECRET,
  JwtLifeTime: process.env.JWT_LIFE_TIME,

  SMTP: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT * 1,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },

  App: {
    name: process.env.APP_NAME,
    website: process.env.APP_WEBSITE,
    mail: process.env.APP_MAIL,
  },
});
