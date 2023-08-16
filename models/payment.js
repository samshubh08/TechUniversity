'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      }),
        payment.belongsTo(models.plan, {
          foreignKey: "planId",
          as: "plan",
        });
    }
  }
  payment.init({
    price: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    plan_duration: DataTypes.STRING,
    plan_start_date: DataTypes.DATE,
    plan_end_date: DataTypes.DATE,
    payment_status: DataTypes.STRING,
    razorpay_payment_id: DataTypes.STRING,
    razorpay_order_id: DataTypes.STRING,
    razorpay_signature: DataTypes.STRING,
    planId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};