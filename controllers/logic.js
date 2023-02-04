const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");
const Attendance = require("../models/attendance");

const Leave = require("../models/leave");

const router = express.Router();

exports.signup = async (req, res, next) => {
  const { name, email, password, post, salary, manager } = req.body;
  try {
    if (!(name && email && password && post && salary && manager)) {
      res.status(400).send("All input is required");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await Employee.create({
      name: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      post: post,
      salary: salary,
      manager: manager,
    });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;

    res.status(201).json({ user: user, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

function generateAccessToken(id, name) {
  return jwt.sign({ id: id, name: name }, process.env.TOKEN_SECRET);
}

exports.login = (req, res) => {
  const { email, password } = req.body;

  Employee.findAll({ where: { email: email } })
    .then((user) => {
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) {
            res
              .status(500)
              .json({ success: false, message: "Something went wrong" });
          }
          if (result === true) {
            res.status(200).json({
              success: true,
              message: "User login successfully",
              token: generateAccessToken(user[0].id, user[0].name),
            });
          } else {
            return res
              .status(400)
              .json({ success: false, message: "Password is incorrect" });
          }
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err, sucees: false });
    });
};

exports.getAllEmployees = (req, res) => {
  Employee.findAll().then((employees) => {
    res.json(employees);
  });
};

exports.getEmployeeProfile = (req, res) => {
  Employee.findAll({ where: { id: req.params.id } })
    .then((employee) => {
      res.status(200).json(employee);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving employee profile",
        error,
      });
    });
};

exports.addEmployee = (req, res) => {
  const { name, email, password, post, salary, manager } = req.body;
  console.log(name, email, password, post, salary, manager);
  Employee.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    post: req.body.post,
    salary: req.body.salary,
    manager: req.body.manager,
  })
    .then((employee) => {
      res.status(200).json({
        message: "Employee added successfully",
        data: employee,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error adding employee",
        error,
      });
    });
};

exports.removeEmployee = (req, res, next) => {
  const token = req.header("Authorization");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return res.status(401).send({ error: "Not authorized" });
  const id = req.params.id;
  Employee.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send({
      message: "Employee removed successfully",
    });
  });
};

exports.promoteEmployee = (req, res, next) => {
  Employee.update(
    {
      post: req.body.post,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.status(200).send({
      message: "Employee promoted successfully",
    });
  });
};

exports.updateSalary = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    employee.update({
      salary: req.body.salary,
    });

    return res.json({
      message: "Employee salary updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
    });
  }
};

exports.assignManager = (req, res, next) => {
  Employee.update(
    {
      post: req.body.post,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.status(200).send({
      message: "Employee promoted successfully",
    });
  });
};

exports.showAllLeave = async (req, res) => {
  const leaves = await Leave.findAll();
  res.json(leaves);
};

exports.addLeave = (req, res) => {
    const { name,leaveFrom, leaveTo } = req.body;
    console.log(name,leaveFrom, leaveTo);
    Leave.create({
        name: req.body.name,
        leaveFrom: req.body.leaveFrom,
        leaveTo: req.body.leaveTo
    })
      .then((leave) => {
        res.status(200).json({
          message: "leave added successfully",
          data: leave,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error adding leave",
          error,
        });
      });
  };

  exports.updateLeave = async (req, res, next) => {
    const { name,leaveFrom, leaveTo } = req.body;

    try {
      const leave = await Leave.findOne({
        where: {
          id: req.params.id,
        },
      });
  
      if (!leave) {
        return res.status(404).json({
          error: "Leave not found",
        });
      }
  
      leave.update({
        name: req.body.name,
        leaveFrom: req.body.leaveFrom,
        leaveTo: req.body.leaveTo
      });
  
      return res.json({
        message: "Leave updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
      });
    }
  };
  

exports.deleteLeave = (req, res, next) => {
    const id = req.params.id;
    Leave.destroy({
      where: { id: id },
    }).then(() => {
      res.status(200).send({
        message: "Leave removed successfully",
      });
    });
  };


//   api to fetch the full name of employee ,their salary and manager

exports.getAPI = (req,res)=>{
    Employee.findAll({
        attributes: ['name', 'salary',"manager"],
        raw: true
      })
    .then(response =>{
        res.status(201).json({response})
    })
    .catch(err =>{
        res.status(500).json({err})
    })
}