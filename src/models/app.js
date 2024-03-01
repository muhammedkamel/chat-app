const { DataTypes, Sequelize } = require('sequelize');
const app = require('../app');

const sequelizeClient = app.get('sequelizeClient');

const App = sequelizeClient.define(
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
            type: 'timestamp without time zone',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updatedAt: {
            type: 'timestamp without time zone',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
);

module.exports = App;