const Sequelize = require('sequelize');

module.exports = function setupSequelize(app) {
    const config = app.get('config');

    const sequelize = new Sequelize(config.db);

    app.set('sequelizeClient', sequelize);
};
