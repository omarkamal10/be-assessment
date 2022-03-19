export default (connection, DataTypes) =>
  connection.define(
    "UserURLChecks",
    {
      urlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "URLs",
          key: "id",
        },
      },
      visitedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      responseTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      successful: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      connection,
      tableName: "UserURLChecks",
      timestamps: false,
    }
  );
