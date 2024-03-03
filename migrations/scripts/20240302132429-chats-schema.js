'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(
      'chats',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        app_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'apps',
            key: 'id',
            as: 'app_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        },
        messages_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()'),
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()'),
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          unique_app_chat: {
            fields: ['app_id', 'number'],
          }
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('chats');
  }
};
