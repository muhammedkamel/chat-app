const createAppsModel = require('./apps.model');
const createChatsModel = require('./chats.model');

function getModel(modelName) {
    const sequelize = this.get('sequelizeClient');

    return sequelize.models[modelName];
}

module.exports = function registerModels(app) {
    createAppsModel(app);
    createChatsModel(app);

    const sequelize = app.get('sequelizeClient');
    const { models } = sequelize;

    Object.keys(models).forEach(name => {
        if ('associate' in models[name]) {
            models[name].associate(models);
        }
    });

    app.getModel = getModel;
}

