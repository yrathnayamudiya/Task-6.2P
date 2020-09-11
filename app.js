const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const users = require('./routes/users/users');
app.use(bodyParser.json());
app.use('/users',users)


module.exports = app;