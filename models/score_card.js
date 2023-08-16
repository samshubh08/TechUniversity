'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score_card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      score_card.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      }),
      score_card.belongsTo(models.plan, {
        foreignKey: 'planId',
        as: 'plan'
      })
      // score_card.belongsTo(models.test_series, {
      //   foreignKey: 'test_seriesId',
      //   as: 'test_series'
      // })
    }
  }
  score_card.init({
    userId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER,
    test_seriesId: DataTypes.TEXT,
    score: DataTypes.STRING,
    attempts: DataTypes.STRING,
    description: DataTypes.STRING,
    test_result: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'score_card',
  });
  return score_card;
};