const Sequelize = require("sequelize");
const  sequelize  = require("../util/database");


const Attendance = sequelize.define('attendance', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    checkIn: {
      type: Sequelize.TIME,
      allowNull: false
    },
    checkOut: {
      type: Sequelize.TIME,
      allowNull: false
    }
  });

  module.exports = Attendance;