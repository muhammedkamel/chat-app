const { DataTypes, Sequelize } = require('sequelize');

module.exports = function createChatsModel(app) {
    const sequelizeClient = app.get('sequelizeClient');

    const chats = sequelizeClient.define(
        'chats',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                autoIncrementIdentity: true,
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            messagesCount: {
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

    chats.associate = (models) => {
        chats.belongsTo(models.apps);
    }

    return chats;
};