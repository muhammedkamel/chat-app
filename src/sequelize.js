const Sequelize = require('sequelize');

module.exports = function setupSequelize(app) {
    const config = app.get('config');

    return new Sequelize(config.db);
};
