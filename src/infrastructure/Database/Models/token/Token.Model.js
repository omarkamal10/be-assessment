export default (connection, DataTypes) =>
  connection.define(
    "Tokens",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      connection,
      tableName: "Tokens",
      timestamps: false,
    }
  );
