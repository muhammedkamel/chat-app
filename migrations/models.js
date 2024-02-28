const Sequelize = require('sequelize');
const app = require('../src/server');

const sequelize = app.get('sequelize');
const models = sequelize.models;

module.exports = Object.assign({ Sequelize, sequelize }, models);