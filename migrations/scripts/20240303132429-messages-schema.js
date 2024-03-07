'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(
      'messages',
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
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        chat_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'chats',
            key: 'id',
            as: 'chat_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
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
            fields: ['chat_id', 'number'],
          }
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('messages');
  }
};
