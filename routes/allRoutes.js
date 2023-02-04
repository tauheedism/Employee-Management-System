const express = require('express');


const router = express.Router();

const logicController = require('../controllers/logic');

router.post('/signup',logicController.signup);

router.post('/login',logicController.login);


router.get("/api/employees", logicController.getAllEmployees);

router.get("/api/employee/:id", logicController.getEmployeeProfile);

router.post("/api/employee", logicController.addEmployee);

router.delete("/api/employee/:id",logicController.removeEmployee);

router.put("/api/employee/:id/promote", logicController.promoteEmployee);

router.put("/api/employee/:id/salary", logicController.updateSalary);

router.put("/api/employee/:id/manager", logicController.assignManager);

router.get("/leaves", logicController.showAllLeave);

router.post("/leaves", logicController.addLeave);

router.put("/leaves/:id", logicController.updateLeave);

router.delete("/leaves/:id", logicController.deleteLeave);

router.get("/details", logicController.getAPI);




module.exports= router;