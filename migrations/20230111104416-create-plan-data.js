'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plan_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      test_seriesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'test_series',
          key: 'id'
        }
      },
      question_bankId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'question_banks',
          key: 'id'
        }
      },
      videoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'videos',
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
    await queryInterface.dropTable('plan_data');
  }
};