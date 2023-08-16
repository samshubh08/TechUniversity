'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  plan_data.init({
    test_seriesId: DataTypes.INTEGER,
    question_bankId: DataTypes.INTEGER,
    videoId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plan_data',
  });
  return plan_data;
};