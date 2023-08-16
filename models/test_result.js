'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      test_result.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      }),
      test_result.belongsTo(models.plan, {
        foreignKey: 'planId',
        as: 'plan'                   
      }),
      test_result.belongsTo(models.test_series, {
        foreignKey: 'questionId',
        as: 'test_series'
      })
    }
  }
  test_result.init({
    userId: DataTypes.INTEGER,
    sessionId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    answer_chosen: DataTypes.INTEGER,
    correct_option: DataTypes.INTEGER,
    attempts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'test_result',
  });
  return test_result;
};