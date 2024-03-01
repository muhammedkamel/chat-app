const config = require('./config');
const express = require('express');
const setupSequelize = require('./sequelize');

const app = express();

app.set('config', config);
app.set('sequelizeClient', setupSequelize(app));

module.exports = app;