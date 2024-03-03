const { DataTypes, Sequelize } = require('sequelize');

module.exports = function createAppsModel(app) {
    const sequelizeClient = app.get('sequelizeClient');

    const apps = sequelizeClient.define(
        'apps',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                autoIncrementIdentity: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
                unique: true,
            },
            chatsCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
                allowNull: false,
            },
        },
    );

    apps.associate = (models) => {
        apps.hasMany(models.chats);
    }

    return apps;
};
