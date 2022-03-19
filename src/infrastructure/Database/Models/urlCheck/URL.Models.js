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
        type: DataTypes.STRING(255),
        allowNull: false,
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
