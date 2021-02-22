const { Sequelize } = require("sequelize");
const MessageModel = require("./message/messageModel");

// db is not created automatically.
const sequelize = new Sequelize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
    host: "localhost",
    dialect: "mysql",
  });

const Message = MessageModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Synchronized tables.");
});

module.exports = {
  Message,
  sequelize,
};
