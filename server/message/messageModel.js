module.exports = (sequelize, dataTypes) => {
  return sequelize.define("message", {
    id: {
      type: dataTypes.STRING,
      primaryKey: true,
    },
    alias: dataTypes.STRING,
    content: dataTypes.STRING,
    secret: dataTypes.STRING,
    date: dataTypes.DATE,
  });
};
