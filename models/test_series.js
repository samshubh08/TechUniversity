'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      test_series.belongsTo(models.course, {
        foreignKey: 'courseId',
        as: 'course'
      }),
      test_series.belongsTo(models.subject, {
        foreignKey: 'subjectId',
        as:'subject'
      })
    }
  }
  test_series.init({
    question: DataTypes.STRING,
    option_1: DataTypes.STRING,
    option_2: DataTypes.STRING,
    option_3: DataTypes.STRING,
    option_4: DataTypes.STRING,
    correct_option: DataTypes.INTEGER,
    description: DataTypes.STRING,
    isTest: DataTypes.STRING,
    subjectId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'test_series',
  });
  return test_series;
};
