'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plan_packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.STRING,
        defaultValue: true
      },
      status: {
        type: Sequelize.ENUM("active", "inactive")
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
    await queryInterface.dropTable('plan_packages');
  }
};