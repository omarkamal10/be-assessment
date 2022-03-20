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
      status: {
        type: DataTypes.ENUM("Up", "Down"),
        allowNull: true,
        defaultValue: "Up",
      },
      failures: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      success: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      availability: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      outages: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      downtime: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      uptime: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
      responseTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      history: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      connection,
      tableName: "UserURLChecks",
      timestamps: false,
    }
  );
