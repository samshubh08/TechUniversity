'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      currency: {
        type: Sequelize.STRING
      },
      plan_duration: {
        type: Sequelize.STRING
      },
      plan_start_date: {
        type: Sequelize.DATE
      },
      plan_end_date: {
        type: Sequelize.DATE
      },
      payment_status: {
        type: Sequelize.ENUM("pending", "done", "rejected")
      },
      razorpay_payment_id: {
        type: Sequelize.STRING
      },
      razorpay_order_id: {
        type: Sequelize.STRING
      },
      razorpay_signature: {
        type: Sequelize.STRING
      },
      planId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
    await queryInterface.dropTable('payments');
  }
};