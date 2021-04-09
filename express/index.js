require('./config/config');
require('./global_functions');
require('./config/imports');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const v1 = require('./routes/v1');
var cors = require('cors');
const bodyParser = require('body-parser');
const { decrypt } = require('./services/cryptoService');


var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));

const models = require("./models");
models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database:', CONFIG.db_name);
}).catch(err => {
  console.log('Unable to connect to SQL database:', CONFIG.db_name, err.message);
});
if (CONFIG.app === 'local') {
  models.sequelize.sync();
}
app.use(async function (req, res, next) {
  console.log('headers: ', req.headers.authorization);//gives the encrypted text in header(Header->Authorization)
  if (req && req.headers && req.headers.authorization) {
    req.headers.authorization = decrypt(req.headers.authorization);//to decrypt the text
    console.log('after: ', req.headers.authorization);
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const passport = require('passport');

//Passport
app.use(passport.initialize());

app.use('/v1', v1);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.errors = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);


});
module.exports = app;
