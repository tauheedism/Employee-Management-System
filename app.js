const express = require('express');
const jwt = require('jsonwebtoken');

const cors = require('cors')
const dotenv=require('dotenv');

const bodyParser = require("body-parser");


const sequelize = require("./util/database");
const allRoutes=require('./routes/allRoutes')
const app = express();

const Employee = require("./models/employee");
const Attendance = require("./models/attendance");
const Leave = require("./models/leave");

app.use(cors());
dotenv.config();

app.use(bodyParser.json());
app.use(express.json());


app.use(allRoutes);

Employee.hasMany(Leave, { as: 'leaves' });
Employee.hasMany(Attendance, { as: 'attendances' });
Leave.belongsTo(Employee, { as: 'employee' });
Attendance.belongsTo(Employee, { as: 'employee' });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
    console.log('App listening on port 3000');

  })
  .catch((err) => {
    console.log(err);
  });
