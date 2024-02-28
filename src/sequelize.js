const Sequelize = require('sequelize');
const config = require('../migrations/config');

module.exports = function setupSequelize() {
    return new Sequelize(config[process.env.NODE_ENV]);
};
