export default (connection, DataTypes) =>
  connection.define(
    "URLs",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      protocol: {
        type: DataTypes.ENUM("HTTP", "HTTPS", "TCP"),
        allowNull: false,
        default: "HTTP",
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      port: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      webhook: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      timeout: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 5 * 1000,
      },
      interval: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 1000 * 60 * 10,
      },
      threshold: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      authentication: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      httpHeaders: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      assert: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ignoreSSL: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      connection,
      tableName: "URLs",
      timestamps: false,
    }
  );
