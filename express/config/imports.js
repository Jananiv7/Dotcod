Sequelize = require('sequelize');
User = require('../models').user;
Documents = require('../models').documents;


EmployeeController = require('../controllers/employeeController');


Op = Sequelize.Op;
fn = Sequelize.fn;