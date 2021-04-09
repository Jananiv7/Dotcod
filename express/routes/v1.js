var express = require('express');
var router = express.Router();
jwt = require("jsonwebtoken");
const passport = require('passport');
console.log('hhhhhhhhhhhhhhhhhhhhhhhhhh');
require('./../middleware/passport')(passport);
router.post('/login', EmployeeController.login);
router.post('/getDocList',EmployeeController.getDocList);
router.post('/createNewEmployee', EmployeeController.createNewEmployee);
router.post('/refreshToken', EmployeeController.refreshToken);
// router.post('/checkEmail', passport.authenticate('jwt', { session: false }), EmployeeController.checkEmail);




module.exports = router;
