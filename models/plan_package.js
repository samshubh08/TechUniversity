'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan_package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      plan_package.belongsTo(models.plan, {
        foreignKey: 'planId',
        as: 'plan'
      })
    }
  }
  plan_package.init({
    price: DataTypes.FLOAT,
    duration: DataTypes.STRING,
    isActive: DataTypes.STRING,
    status: DataTypes.STRING,
    planId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plan_package',
  });
  return plan_package;
};