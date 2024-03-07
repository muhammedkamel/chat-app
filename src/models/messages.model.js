const { DataTypes, Sequelize } = require('sequelize');

module.exports = function createChatsModel(app) {
    const sequelizeClient = app.get('sequelizeClient');

    const messages = sequelizeClient.define(
        'messages',
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
            content: {
                type: DataTypes.STRING,
                allowNull: false,
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

    messages.associate = (models) => {
        messages.belongsTo(models.chats);
    }

    return messages;
};