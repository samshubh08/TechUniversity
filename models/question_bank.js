'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question_bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      question_bank.belongsTo(models.subject, {
        foreignKey: 'subjectId',
        as:'subject'
      })
    }
  }
  question_bank.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    subjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'question_bank',
  });
  return question_bank;
};