const Sequelize = require("sequelize");
const  sequelize  = require("../util/database");
const Employee=require('./employee')


const Leave = sequelize.define('leave', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    leaveFrom: {
      type: Sequelize.DATE,
      allowNull: false
    },
    leaveTo: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  module.exports = Leave;