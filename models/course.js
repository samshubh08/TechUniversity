'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course.belongsTo(models.plan, {
        foreignKey: 'planId',
        as: 'plan'
      })
    }
  }
  course.init({
    name: DataTypes.STRING,
    starts_from: DataTypes.DATE,
    course_duration: DataTypes.TIME,
    course_price: DataTypes.STRING,
    course_incharge: DataTypes.STRING,
    department: DataTypes.STRING,
    year: DataTypes.DATEONLY,
    course_description: DataTypes.STRING,
    planId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};