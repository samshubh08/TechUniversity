'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('score_cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      planId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plans',
          key: 'id'
        }
      },
      test_seriesId: {
        type: Sequelize.TEXT
      },
      score: {
        type: Sequelize.STRING
      },
      attempts: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      test_result: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('score_cards');
  }
};