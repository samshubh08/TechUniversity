'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      starts_from: {
        type: Sequelize.DATE,
        allowNull: false
      },
      course_duration: {
        type: Sequelize.TIME,
        allowNull: false
      },
      course_price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      course_incharge: {
        type: Sequelize.STRING,
        allowNull: false
      },
      department: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      course_description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('courses');
  }
};