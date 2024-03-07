const config = require('../config/app');
const express = require('express');
const setupSequelize = require('./sequelize');
const registerModels = require('./models');

const app = express();

app.set('config', config);

setupSequelize(app);

registerModels(app);

module.exports = app;