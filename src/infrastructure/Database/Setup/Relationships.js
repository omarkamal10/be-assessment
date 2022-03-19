export default ({ Users, Tokens, UserURLChecks, URLs }) => {
  //RELATIONSHIPS HERE
  Tokens.belongsTo(Users, { as: "user", foreignKey: "userId" });
  Users.hasMany(Tokens, { as: "Tokens", foreignKey: "userId" });
  UserURLChecks.belongsTo(URLs, { as: "urls", foreignKey: "urlId" });
  URLs.hasMany(UserURLChecks, { as: "UserURLChecks", foreignKey: "urlId" });

  URLs.belongsTo(Users, { as: "user", foreignKey: "userId" });
  Users.hasMany(URLs, { as: "URLs", foreignKey: "userId" });
};
