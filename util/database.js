const Sequelize = require("sequelize");

const sequelize = new Sequelize("empmanagemant", "root", "Siddiqui@615", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

