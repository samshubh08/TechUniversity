'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('test_results', {
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
      sessionId: {
        type: Sequelize.TIME
      },
      planId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plans',
          key: 'id'
        }
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'test_series',
          key: 'id'
        }
      },
      attempts: {
        type: Sequelize.INTEGER
      },
      answer_chosen: {
        type: Sequelize.INTEGER
      },
      correct_option: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('test_results');
  }
};