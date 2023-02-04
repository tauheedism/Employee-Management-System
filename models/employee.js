const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Employee = sequelize.define("employee", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
},
password:Sequelize.STRING,
  post: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  manager: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Employee;
